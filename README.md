- [x] Environment Setup
- [Node.js](https://nodejs.org/)
- [Visual Studio Code](https://code.visualstudio.com)

- Start PowerShell (for Windows OS Security) as an Administrator, run the [Set-ExecutionPolicy] cmdlet with the parameter RemoteSigned
  `Set-ExecutionPolicy RemoteSigned`
- [x] Create a repository folder for your project
- [x] Set your git [user.name](https://docs.github.com/en/get-started/git-basics/setting-your-username-in-git), [user.mail](https://docs.github.com/en/account-and-profile/how-tos/setting-up-and-managing-your-personal-account-on-github/managing-email-preferences/setting-your-commit-email-address) with git-bash or git gui
- [x] [Create app - Install Tailwind CSS with Next.js ](https://tailwindcss.com/docs/installation/framework-guides/nextjs)
- [x] Create [Git-Hub](https://github.com/) repository
- [x] Push your project to remote git repository

  ```javascript
  git remote add origin https://github.com/...
  git branch -M main
  git push -u origin main
  ```

- [x] Manage main layout, add few pages. (About, Settings, Contact Us)
- [x] [Create a responsive navigation bar and use it.](https://medium.com/@hanekcud/how-to-create-responsive-navbar-in-next-js-using-tailwind-css-eed2e7dc925a)

- [x] [Authentication - Clerk](https://clerk.com/docs/quickstarts/nextjs)
      Sign-in page, src/middleware.ts

- [x] Database - mySql
- Host : [Aiven free plan](https://aiven.io/mysql)
- database provider library : mysql2
- API file : src/api/{apiname}/route.ts
- .env file example connection string :
  MYSQL_DATABASE_URL=mysql://avnadmin:password@subdomain.aivencloud.com:port/defaultdb

- [x] Clerk Webhooks & mySql sync.

- [Clerk referance](https://clerk.com/docs/webhooks/sync-data)
- Uses Clerk auth instead of JWT.
- [ngrok Tunnel](https://ngrok.com/)
- Users Table (mySql)

```sql
CREATE TABLE "users" (
  "idusers" int NOT NULL AUTO_INCREMENT,
  "fullname" varchar(100) DEFAULT NULL,
  "email" varchar(100) DEFAULT NULL,
  "idclerk" varchar(100) NOT NULL,
  "isadmin" tinyint DEFAULT NULL,
  "ismember" tinyint DEFAULT NULL,
  "imgurl" varchar(200) DEFAULT NULL,
  PRIMARY KEY ("idusers")
);
SELECT * FROM defaultdb.users;
```

- next.config.ts : added remote pattern to get profile images from clerk

```js
import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  /* config options here */
};
module.exports = {
  images: {
    remotePatterns: [new URL("https://img.clerk.com/**")],
  },
};
export default nextConfig;
```

- [x] Mobile navbar removed, Sign In/User button placed.

- [ ] Db interfaces/api organized, to-do crud implemented
