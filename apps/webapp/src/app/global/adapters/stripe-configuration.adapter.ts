import { StripeConfigurationEntity } from './../entities/stripe-configuration.entity';
import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export const StripeConfigurationAdapter: EntityAdapter<StripeConfigurationEntity> =
  createEntityAdapter<StripeConfigurationEntity>({ sortComparer: false });

export const {
  selectIds: selectArticleIds,
  selectEntities: selectArticleEntities,
  selectAll: selectAllArticles,
  selectTotal: articlesCount,
} = StripeConfigurationAdapter.getSelectors();
