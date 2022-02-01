import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { StripeWebhookDataModel } from '../../domain/models/stripe-webhook-data.model';

export const StripeWebhookData = createParamDecorator(
  (_data: unknown, context: ExecutionContext): StripeWebhookDataModel => {
    const request = context.switchToHttp().getRequest();

    return {
      signature: request.headers['stripe-signature'],
      payload: request.rawBody,
    };
  }
);
