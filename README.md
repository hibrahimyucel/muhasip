## Reference

github : https://github.com/hibrahimyucel/NextjsTSql

live : https://mysql.mmbis.com.tr/

[Node.js](https://nodejs.org/)

[Visual Studio Code](https://code.visualstudio.com)

[Next Js](http://nextjs.org/)

[Tailwind CSS](https://tailwindcss.com/docs/installation/framework-guides/nextjs)

[Clerk](https://clerk.com/docs/quickstarts/nextjs)

[Aiven](https://aiven.io/mysql)

[ngrok](https://ngrok.com/)

[nodemailer](https://nodemailer.com/)

[e-Mail configuration on Google](https://dev.to/emmanuel_xs/how-to-send-emails-for-free-in-nextjs-using-gmail-and-nodemailer-4i6e)

[Create a responsive navigation bar and use it.](https://medium.com/@hanekcud/how-to-create-responsive-navbar-in-next-js-using-tailwind-css-eed2e7dc925a)

## Road map

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
- [ ] [Create a responsive navigation bar and use it.](https://medium.com/@hanekcud/how-to-create-responsive-navbar-in-next-js-using-tailwind-css-eed2e7dc925a)

- [x] [Authentication - Clerk](https://clerk.com/docs/quickstarts/nextjs)
      Sign-in page, src/middleware.ts

- [x] Database - mySql
- Host : [Aiven free plan](https://aiven.io/mysql)
- database provider library : mysql2
- .env file example connection string :
  MYSQL_DATABASE_URL=mysql://avnadmin:password@subdomain.aivencloud.com:port/defaultdb

- [x] Clerk Webhooks & mySql sync.

- [Clerk referance](https://clerk.com/docs/webhooks/sync-data)
- Uses Clerk auth, session security.
- [ngrok Tunnel](https://ngrok.com/)
- Clerk webhook : ./app/api/webhooks/route.ts
- T-SQL procedures : ./dbusers.tsx
- Users Table (mySql)

```sql
CREATE TABLE "users" (
  "idusers" int NOT NULL AUTO_INCREMENT,
  "fullname" varchar(100) DEFAULT NULL,
  "email" varchar(100) DEFAULT NULL,
  "idclerk" varchar(100) NOT NULL,
  PRIMARY KEY ("idusers")
);
SELECT * FROM defaultdb.users;
```

- added remote pattern to get profile images from clerk

```js
file : root/next.config.ts

import  type { NextConfig } from  "next";
const  nextConfig:  NextConfig  = {
/* config options here */
};
module.exports  = {
images: {
remotePatterns: [new  URL("https://img.clerk.com/**")],
},
};
export  default  nextConfig;
```

- [x] Local storage hooks
      ContactCard; home page route component
      [React hooks](https://blog.logrocket.com/using-localstorage-react-hooks/)
      ContactForm; useLocalStorage (useState) reusable hook
  - reads data from local storage.
  - returns useEffect hook used for writing to local storage.

- [x] ContactForm; sends mail on submit.

[nodemailer](https://nodemailer.com/) library for mail methods

```
npm install node mailer
```

[e-Mail configuration on Google](https://dev.to/emmanuel_xs/how-to-send-emails-for-free-in-nextjs-using-gmail-and-nodemailer-4i6e)

- [x] Customers table

```SQL
CREATE TABLE "customers" (
  "idcustomers" int NOT NULL AUTO_INCREMENT,
  "name" varchar(100) NOT NULL,
  "adress" varchar(200) DEFAULT NULL,
  "city" varchar(45) DEFAULT NULL,
  "phone" varchar(15) DEFAULT NULL,
  PRIMARY KEY ("idcustomers")
);
```

- [x] Customers page; filter, edit.

- Table component : local filter
- Row component : show lines
- Edit component : inline component for insert and edit data

post data with header, decode data again before process (encodeURIComponent, decodeURIComponent)

```js
export async function saveCustomers(cdata:  TCustomer) {
let  value  = [];
const  pdata:  TCustomer  = {
idcustomers: cdata.idcustomers,
name: encodeURIComponent(cdata.name),
city: encodeURIComponent(cdata.city),
adress: encodeURIComponent(cdata.adress),
phone: encodeURIComponent(cdata.phone),
};

const  res  =  await  fetch("/api/customers", {
method: "POST",
headers: {
"Content-Type": "application/json",
data: JSON.stringify(pdata),
},
});
if (res.ok) {
const  resp  =  await  res.json();
value  =  resp.results;
}
return  value;
}
```

./api/customers/route.ts

```ts
export async function POST(request: NextRequest) {
  const dataStr = request.headers.get("data");

  if (dataStr) {
    const data = JSON.parse(dataStr);

    if (data.idcustomers) {
      let sql =
        "UPDATE customers SET name = ?, adress = ?, city = ?, phone = ? WHERE idcustomers = ?";

      let p: string[] = [
        decodeURIComponent(data.name),
        decodeURIComponent(data.adress),
        decodeURIComponent(data.city),
        decodeURIComponent(data.phone),
        data.idcustomers,
      ];
      return await execquery(sql, p);
    } else {
      let sql =
        "INSERT INTO customers (name,adress,city,phone) VALUES ( ?,?,?,?)";

      let p: string[] = [
        decodeURIComponent(data.name),
        decodeURIComponent(data.adress),
        decodeURIComponent(data.city),
        decodeURIComponent(data.phone),
      ];
      return await execquery(sql, p);
    }
  }
}
```

Refresh page after post "redirect()"

```js
function saveCustomer() {
  saveCustomers(cdata);
  isOpenFunc(false);
  redirect("/customers");
}
```

## Files

| File                 | Comments                                            |
| -------------------- | --------------------------------------------------- |
| /layout.tsx          | root layout                                         |
| /page.tsx            | main page                                           |
| /sign-in/[[sign-in]] | Clerk Sign-In page                                  |
| /contactus           | user's ticket form                                  |
| /users               | users list                                          |
| /customers           | customers (crud, db query, local filer, local sort) |
| /api/webhooks        | clerk endpoint                                      |
| /api/users           | users                                               |
| /api/customers       | customers                                           |

##end of file
