---
description: Deploy the project to Vercel
---

To deploy this project to Vercel, follow these steps.

1.  **Login to Vercel** (if you haven't already):
    This command will open your browser to authenticate.
    ```bash
    npx vercel login
    ```

2.  **Deploy to Production**:
    This command deploys the current folder to Vercel. 
    - When asked `Set up and deploy?`, answer `Y`.
    - Accept default values for the other questions (Scope, Link to existing project, etc).
    
    // turbo
    npx vercel --prod
