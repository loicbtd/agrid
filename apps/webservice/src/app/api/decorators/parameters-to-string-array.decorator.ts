import { BadRequestException } from '@nestjs/common';

export const ParamToStringArray =
  () => (object: unknown, propertyKey: string) => {
    let value: string[];

    const getter = () => {
      return value;
    };

    const setter = (input: unknown) => {
      if (typeof input === 'string') {
        value = [input as string];
      } else if (
        Array.isArray(input) &&
        input.length &&
        input.every((item) => typeof item === 'string')
      ) {
        value = input;
      } else {
        throw new BadRequestException();
      }
    };

    Object.defineProperty(object, propertyKey, {
      get: getter,
      set: setter,
    });
  };
