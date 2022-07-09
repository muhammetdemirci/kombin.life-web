import { GraphQLSchemaHost, Plugin } from '@nestjs/graphql';
import { ApolloServerPlugin, GraphQLRequestListener } from 'apollo-server-plugin-base';
import { GraphQLError } from 'graphql';
import { fieldExtensionsEstimator, getComplexity, simpleEstimator } from 'graphql-query-complexity';

@Plugin()
export class ComplexityPlugin implements ApolloServerPlugin {
  constructor(private gqlSchemaHost: GraphQLSchemaHost) {}

  requestDidStart(): GraphQLRequestListener {
    const { schema } = this.gqlSchemaHost;

    const { GRAPHQL_MAX_COMPLEXITY } = process.env;

    if (!GRAPHQL_MAX_COMPLEXITY) {
      throw new Error('GRAPHQL_MAX_COMPLEXITY is not set as the environment key');
    }

    return {
      didResolveOperation({ request, document }) {
        const complexity = getComplexity({
          schema,
          operationName: request.operationName,
          query: document,
          variables: request.variables,
          estimators: [fieldExtensionsEstimator(), simpleEstimator({ defaultComplexity: 1 })],
        });
        if (complexity >= +GRAPHQL_MAX_COMPLEXITY) {
          throw new GraphQLError(
            `Query is too complex: ${complexity}. Maximum allowed complexity: ${+GRAPHQL_MAX_COMPLEXITY}`,
          );
        }
      },
    };
  }
}
