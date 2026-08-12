import path from "path"
import { describe, expect, it } from "vitest"

import { findCommonRoot } from "./get-config"

describe("findCommonRoot", () => {
  it("normalizes mixed separators in Windows paths", () => {
    const cwd = "C:\\Users\\Username\\projects\\my-app"
    const resolvedPath = "C:/Users/Username/projects/my-app/src/components"

    expect(findCommonRoot(cwd, resolvedPath)).toBe(
      "C:\\Users\\Username\\projects\\my-app"
    )
  })

  it("compares Windows path segments case-insensitively", () => {
    const cwd = "C:\\Users\\Username\\Projects\\my-app"
    const resolvedPath = "c:/users/username/projects/my-app/src/components"

    expect(findCommonRoot(cwd, resolvedPath)).toBe(
      "C:\\Users\\Username\\Projects\\my-app"
    )
  })

  it("keeps native behavior for POSIX paths", () => {
    const cwd = path.join("/home", "user", "projects", "my-app")
    const resolvedPath = path.join(cwd, "src", "components")

    expect(findCommonRoot(cwd, resolvedPath)).toBe(cwd)
  })
})
