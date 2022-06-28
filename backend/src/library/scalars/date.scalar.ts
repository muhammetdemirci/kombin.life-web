import { CustomScalar, Scalar } from '@nestjs/graphql';
import { format, parse } from 'date-fns';
import { Kind, ValueNode } from 'graphql';

@Scalar('Date')
export class DateScalar implements CustomScalar<string, Date> {
  description = 'Date is a custom date type';

  private parse(value: string): Date {
    return parse(value, 'yyyy-MM-dd', new Date());
  }

  parseValue(value: string): Date {
    return this.parse(value);
  }

  serialize(value: Date): string {
    return format(value, 'HH:mm:ss');
  }

  parseLiteral(ast: ValueNode): Date | null {
    if (ast.kind === Kind.STRING) {
      return this.parse(ast.value);
    }
    return null;
  }
}
