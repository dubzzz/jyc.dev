import { Entity, Fields, Relations } from 'remult'

import { LogHandleFollow } from './LogHandleFollow'
import { LogHandleStats } from './LogHandleStats'

@Entity<LogHandle>('log-handles', {
  defaultOrderBy: {
    updatedAt: 'desc',
  },
})
export class LogHandle {
  @Fields.cuid()
  id!: string

  @Fields.updatedAt()
  updatedAt = new Date()

  @Fields.string({ required: true })
  did!: string

  @Fields.string()
  handle = ''

  @Fields.number()
  execTime = -1

  @Fields.json()
  metadata = {}

  @Relations.toMany<LogHandle, LogHandleStats>(() => LogHandleStats, { fields: { did: 'did' } })
  stats = []

  @Relations.toMany<LogHandle, LogHandleFollow>(() => LogHandleFollow, {
    fields: { did: 'did' },
  })
  follows = []
}