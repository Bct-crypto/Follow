import { attachOpenInEditor } from "@renderer/lib/dev"
import type { FC } from "react"

import type { AppErrorFallbackProps } from "../common/AppErrorBoundary"
import { FallbackIssue } from "../common/ErrorElement"
import { m } from "../common/Motion"
import { Button } from "../ui/button"
import { useCurrentModal } from "../ui/modal"
import { parseError } from "./helper"

export const ModalErrorFallback: FC<AppErrorFallbackProps> = (props) => {
  const { message, stack } = parseError(props.error)
  const modal = useCurrentModal()
  return (
    <m.div
      className="flex flex-col items-center justify-center rounded-md bg-theme-modal-background-opaque p-2"
      exit={{
        opacity: 0,
        scale: 0.9,
      }}
    >
      <div className="m-auto max-w-prose text-center">
        <div className="mb-4">
          <i className="i-mgc-bug-cute-re text-4xl text-red-500" />
        </div>
        <div className="text-lg font-bold">{message}</div>
        {import.meta.env.DEV && stack ? (
          <pre className="mt-4 max-h-48 cursor-text overflow-auto whitespace-pre-line rounded-md bg-red-50 p-4 text-left font-mono text-sm text-red-600">
            {attachOpenInEditor(stack)}
          </pre>
        ) : null}

        <p className="my-8">
          {APP_NAME} has a temporary problem, click the button below to try reloading the app or
          another solution?
        </p>

        <div className="center gap-4">
          <Button onClick={() => modal.dismiss()} variant="outline">
            Close Modal
          </Button>
          <Button onClick={() => window.location.reload()} variant="outline">
            Reload
          </Button>
        </div>

        <FallbackIssue message={message!} stack={stack} />
      </div>
    </m.div>
  )
}
