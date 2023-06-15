// @ts-ignore
import knexfile from '../db/knexfile'
import knex from 'knex'

export const db = knex(knexfile.development);