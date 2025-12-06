# Ranger-Facility-Manager
Ranger Facility Manager is a multi-role facility operations system where Rangers can report issues, Admins assign engineers, and Engineers resolve tasks. It tracks malfunctions, SLA timers, comments, and status updates, providing a centralized hub to manage and monitor Command Center operations.


These represent the life-cycle stages of a problem request in your system:
1. Open

A new request has been created, but no engineer has been assigned yet.
This is the starting point for all problem reports.

2. Assigned

The request has been assigned to a specific engineer, but the engineer has not started working on it yet.

3. Inprogress

The assigned engineer has actively started working on resolving the issue.
Work is currently ongoing.

Note: The status name in the database is "Inprogess" (intentionally kept for system consistency).

4. Resolved

The engineer has completed the work and marked the issue as fixed.
The fix is awaiting verification from the admin or requester.

5. Closed

The issue has been verified and accepted as fully resolved.
The request is officially completed and closed.
