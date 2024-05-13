// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const subscriptionSchema = Type.Object(
  {
    name: Type.String(),
    email: Type.String(),
    seniority: Type.String(),
    area: Type.String()
  },
  { $id: 'Subscription', additionalProperties: false }
)
export const subscriptionValidator = getValidator(subscriptionSchema, dataValidator)
export const subscriptionResolver = resolve({})

export const subscriptionExternalResolver = resolve({})

// Schema for creating new entries
export const subscriptionDataSchema = Type.Pick(subscriptionSchema, ['name', 'email', 'seniority', 'area'], {
  $id: 'SubscriptionData'
})
export const subscriptionDataValidator = getValidator(subscriptionDataSchema, dataValidator)
export const subscriptionDataResolver = resolve({})

// Schema for updating existing entries
export const subscriptionPatchSchema = Type.Partial(subscriptionSchema, {
  $id: 'SubscriptionPatch'
})
export const subscriptionPatchValidator = getValidator(subscriptionPatchSchema, dataValidator)
export const subscriptionPatchResolver = resolve({})

// Schema for allowed query properties
export const subscriptionQueryProperties = Type.Pick(subscriptionSchema, ['name', 'email'])
export const subscriptionQuerySchema = Type.Intersect(
  [
    querySyntax(subscriptionQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export const subscriptionQueryValidator = getValidator(subscriptionQuerySchema, queryValidator)
export const subscriptionQueryResolver = resolve({})
