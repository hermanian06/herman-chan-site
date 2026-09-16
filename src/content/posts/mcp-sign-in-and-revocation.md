---
title: "Adding sign-in and revocation to my MCP server"
pubDate: 2026-09-15
description: "Remote access needs a way to grant permission, recognize a caller and withdraw that permission."
project: permit-pipeline-mcp
tag: AI
tagClass: ai
---

A supply query can be read-only and still expose information to the wrong caller. Once my MCP server is reachable from a remote AI client, I need a way to grant access, recognize later requests and withdraw that access.

The server implements an OAuth sign-in flow. A client receives an authorization code after approval, exchanges it for a token and includes that token on later requests. The business tools remain separate from this authentication state: querying projects is one responsibility; deciding whether the caller may query them is another.

The code exchange uses PKCE, which binds the exchange to the client that initiated it. The client starts with a random verifier and sends its hashed challenge. When redeeming the code, it supplies the verifier; the server checks the match. This makes an intercepted authorization code insufficient on its own. The implementation uses the S256 challenge method described in [PKCE's specification](https://www.rfc-editor.org/rfc/rfc7636).

<figure class="story-flow">
<figcaption>The server checks more than possession of a signed token</figcaption>
<ol><li><strong>Verify the token</strong>Check its signature and expiry.</li><li><strong>Check current access state</strong>Find the issued token in the registry and reject revoked access.</li><li><strong>Allow the tool request</strong>Proceed only after those checks succeed.</li></ol>
</figure>

The registry check matters for revocation. A token can still have a valid signature and remaining lifetime after I withdraw access. Checking its current status on each request lets the server reject it before that lifetime ends. The same path refuses unknown tokens and database-check failures instead of treating an unavailable access check as approval.

Local PKCE checks used synthetic challenges and verifiers, including mismatched, short and unsupported-method cases. The token-expiry and revocation branches were inspected in source, not executed against a live client. This is evidence for selected implementation paths, not an end-to-end compatibility test or security audit. The [MCP authorization specification](https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization) describes the broader protocol requirements.

That extra state brings operational work: token lifecycle, database availability and useful client errors. Read-only tools reduce what an authorized caller can change, but they do not remove the need to control what the caller can read. I need both parts when moving a useful local tool into someone else's client.
