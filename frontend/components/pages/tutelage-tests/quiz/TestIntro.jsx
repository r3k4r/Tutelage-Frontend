'use client'

import { Laptop } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useIsPhone } from '@/hooks/useIsPhone'

/** The placement test's start screen. On a phone it recommends a bigger screen, then lets them start. */
export default function TestIntro({ minutes, questionCount, hasReading, onStart }) {
  const isPhone = useIsPhone()
  const ready = questionCount > 0

  return (
    <div className="container-page flex min-h-[calc(100dvh-4rem)] items-center py-12">
      <div className="mx-auto w-full max-w-xl">
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">Placement test</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          <span className="tabular-nums">{questionCount}</span> questions · <span className="tabular-nums">{minutes}</span> minutes · your level at the
          end
        </p>

        {isPhone && ready && (
          <div role="note" className="mt-6 flex gap-3 rounded-lg border bg-muted/60 p-4">
            <Laptop className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
            <div className="text-sm">
              <p className="font-medium text-foreground">Using a phone?</p>
              <p className="mt-1 text-muted-foreground">
                {hasReading ? 'Some questions come with a text to read, which is easier on a bigger screen. ' : 'The test is easier on a bigger screen. '}
                If you can, open this page on a laptop, desktop or tablet. If not, no problem: you can take it right here.
              </p>
            </div>
          </div>
        )}

        <ul className="mt-8 space-y-3 text-foreground">
          <li>Find a quiet place. The timer starts when you press start and doesn&apos;t pause.</li>
          <li>Each question has four answers. Choose the best one.</li>
          {hasReading && <li>Some questions are about a short text. The text stays on screen while you answer them.</li>}
          <li>You can&apos;t go back to a question once you move on.</li>
          <li>Answer honestly. At the end you enter your details and see your level.</li>
        </ul>

        {ready ? (
          <Button onClick={onStart} size="lg" className="mt-10 w-full sm:w-auto sm:min-w-48">
            {isPhone ? 'Continue on this phone' : 'Start the test'}
          </Button>
        ) : (
          <p role="status" className="mt-10 rounded-lg border p-4 text-sm text-muted-foreground">
            The test isn&apos;t available right now. Please try again later.
          </p>
        )}
      </div>
    </div>
  )
}
