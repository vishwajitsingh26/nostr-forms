Formstr sdk is the tooling designed on top of the nostr protocol to help create forms that can be embedded into any website, software or usecase. This document outlines the basic api and functionality of the sdk.

## API

### Creating a formstr Instance

Create a formstr SDK instance using:
```js
let formstrSDK = formstr.getInstance(userPrivateKey);
```

here userPrivateKey is a nostr private key, you can use an existing nostr private key, or generate a new one using 

```js
let [sk, pk] = formstrSDK.geneKeyPair();
```

sk = secret key, pk = publick key.

### Create a form

a form can be created using the `createForm` function on the instance like:

```js
let formCredentials = formstrSDK.createForm(formSpec);
```

An example formspec will look like:

```json
{
   "schemaVersion": "<link to schema>",
   "name":"Pets Survey",
   "description":"A survey about your pets",
   "settings":{
      "selfSignForms":false
   },
   "fields":[
      {
         "question":"What is the name of your pet?",
         "answerType":"string",
      },
      {
         "question":"wHAT DO YOU LOVE ABOUT YOUR PET?",
         "answerType":"text",
      },
      {
         "question":"What animal is your pet? ",
         "answerType":"singleChoice",
         "choices":[
            {
               "message":"cat",
            },
            {
               "message":"dog",
            }
         ]
      },
      {
         "question":"Now we need to know about your history with pets.\nallergies, what kinds of pet you had as a child",
         "answerType":"label",
      },
      {
         "question":"How long have you owned a pet for?",
         "answerType":"number",
         "numberConstraints":{
            "max":50,
            "min":0
         }
      }
   ]
}
```

### View Past Forms

```js
let pastForms = formstrSDK.getPastForms();
```

the pastForms array looks like
```json
[{
    "formLink": "https://formstr.app/#/forms/fwfewfgewfewe...",
    "publicKey": "fwfewfgewfewe...",
    "privateKey": "dsfsdfsafsdf..."
}]
```

### Save form to nostr

All forms are backed up to nostr automatically with the private key used to initialize the client, but if a user wants to save a form manually, they can do:

```js
formstrSDK.saveForm(formPrivateKey);
```

this method does not return anything

### Fill an existing form



### View form responses



