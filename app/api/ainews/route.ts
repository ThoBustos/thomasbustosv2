import { NextRequest, NextResponse } from 'next/server'
import { digestService } from '@/lib/digestService'

const PAGE_SIZE = 20

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const limit = Math.min(Number(searchParams.get('limit') ?? PAGE_SIZE), 60)
  const offset = Math.max(Number(searchParams.get('offset') ?? 0), 0)

  try {
    const issues = await digestService.getArchive(limit, offset)
    return NextResponse.json(issues)
  } catch (err) {
    console.error('[api/ainews] getArchive failed:', err)
    return NextResponse.json([], { status: 500 })
  }
}
