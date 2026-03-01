# Integration & Failure Modes — Dialysis Care Taskboard

## Overview

In this project, I built a dialysis care task management interface where multiple healthcare roles (nurse, dietician, social worker) manage tasks for different patients. The frontend interacts with a mocked backend API and is designed to handle imperfect network conditions and incomplete data without breaking the UI.

## State Management Choice

I used React Query for state management because it provides built-in caching, retry mechanisms, background refetching, and support for optimistic updates. These features make the application more reliable, especially in healthcare scenarios where network connectivity may not always be stable.

## Optimistic Updates

When a user updates a task status, the UI changes immediately before the server response is received. If the request fails, the system automatically rolls back the change by refreshing the cached data. This improves responsiveness and provides a smoother user experience.

## Network Failure Handling

The application handles failures by showing loading states during requests and error messages when something goes wrong. React Query also retries failed requests automatically, and cache invalidation ensures the data stays consistent once the network recovers.

## Handling Unexpected Data

To handle incomplete or unexpected backend responses, I used TypeScript interfaces with optional fields and added defensive checks in the UI. Default values are shown when some data is missing, which prevents the application from crashing.

## Extensibility

The system is designed to be easily extendable. Roles are defined using TypeScript types, so adding a new role or task category would only require small updates to the configuration and UI components without major architectural changes.

## Partial Failure Scenarios

The system can handle cases where:

* Tasks fail to load but patient data is available
* A mutation fails after an optimistic update
* Task data is missing or empty

In all cases, the UI continues working and provides feedback to the user.

## Conclusion

Overall, the application demonstrates how frontend systems can remain responsive and reliable even with unstable network conditions. The use of caching, optimistic updates, and defensive programming helps maintain a smooth user experience while keeping the system flexible for future changes.
