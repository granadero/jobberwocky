// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax, StringEnum } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const jobsSchema = Type.Object(
  {
    name: Type.String(),
    description: Type.String(),
    country: Type.String(),
    status: StringEnum(['ACTIVE', 'ON HOLD', 'OUT', 'PLACEMENT'], {
      default: 'ACTIVE'
    }),
    type: StringEnum(['FULL TIME', 'PART TIME', 'INTERNSHIP', 'CONTRACT'], { default: 'FULL TIME' }),
    seniority: StringEnum(['JUNIOR', 'MID', 'SENIOR', 'EXECUTIVE', 'DIRECTOR'], { default: 'JUNIOR' }),
    area: Type.String(),
    industry: Type.String(),
    skills: Type.String(),
    date: Type.String(),
    currency: Type.String(),
    minAnualSalary: Type.Number(),
    maxAnualSalary: Type.Number(),
    benefit: Type.String()
  },
  { $id: 'Jobs', additionalProperties: false }
)
export const jobsValidator = getValidator(jobsSchema, dataValidator)
export const jobsResolver = resolve({})

export const jobsExternalResolver = resolve({})

// Schema for creating new entries
export const jobsDataSchema = Type.Pick(
  jobsSchema,
  [
    'id',
    'name',
    'description',
    'country',
    'status',
    'type',
    'seniority',
    'area',
    'industry',
    'skills',
    'date',
    'currency',
    'minAnualSalary',
    'maxAnualSalary',
    'benefit'
  ],
  {
    $id: 'JobsData'
  }
)
export const jobsDataValidator = getValidator(jobsDataSchema, dataValidator)
export const jobsDataResolver = resolve({})

// Schema for updating existing entries
export const jobsPatchSchema = Type.Partial(jobsSchema, {
  $id: 'JobsPatch'
})
export const jobsPatchValidator = getValidator(jobsPatchSchema, dataValidator)
export const jobsPatchResolver = resolve({})

// Schema for allowed query properties
export const jobsQueryProperties = Type.Pick(jobsSchema, [
  'id',
  'name',
  'status',
  'description',
  'country',
  'type',
  'seniority',
  'area',
  'industry',
  'skills',
  'currency'
])
export const jobsQuerySchema = Type.Intersect(
  [
    querySyntax(jobsQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export const jobsQueryValidator = getValidator(jobsQuerySchema, queryValidator)
export const jobsQueryResolver = resolve({})
