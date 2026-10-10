import { execFileSync } from 'node:child_process'
import { resolve } from 'node:path'

execFileSync('npx', ['wrangler', 'd1', 'execute', 'ratemylandlords', '--local', '--file', resolve('scripts/seed-real-landlords.sql')], { stdio: 'inherit' })
