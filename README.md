# uqlapp-account

uqlapp-account is a reusable component used by UQL Apps. It provides account functions and adds
the X-Uql-Token Request Header to any API requests.

### Getting Started
Bower install into your project:
```sh
bower install https://github.com/uqlibrary/uqlapp-account.git
```
For this to work you must have your GIT password saved on a keychain. 

### Account Service
| Function      | Description                                              |
| ------------- | -------------------------------------------------------- |
| getAccount    | Returns account data for the logged in user              |
| getToken      | Returns the token from the UQ API for the logged in user |
| getTokenName  | Returns the token name from the uqlapp-config component  |
| updateAccount | Updates the user's account via the UQ API                |

