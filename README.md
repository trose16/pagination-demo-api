## API Pagination Demo

### The Problem: 
When making API calls to large datasets, such as product catalogs for a large ecommerce sites with thousands of items stored in the database, returning all data at once is not an option for a single call, for a number of reasons. It would cause a huge strain on the server resulting in bottlenecks and slow sites. It's not a common or desirable user experience to scroll thousands of returned items on a single page (i.e. products, inventory, blog articles etc.)

### Rationale
In software development there are those that build tools and those that build with tools. Both require a developer skillset but with different angles. As a Product Manager I worked with teams leveraging open-source platforms that dynamically rendered APIs enabling us to build client-facing solutions. This is incredibly valuable for accelerating development. As a software architect I needed to build custom api's for microservices and integrations on a smaller scale, which didn't require pagination just a good OpenAPI standard and security.  

This project was my way of demonstrating it's a vital skill to understand what's happening under the hood and how to think about API design principles required to build one that handles large datasets. 

### Pagination as a solution 
Pagination is an API design pattern that enables us to present data/content to a user incrementally in "chunks" making content digestible and presenting content on pages. The question is, which method of pagination is the best choice for a scalable platform? My project explores the two most common methods.

### Pagination Types
As an analogy we can imagine an API's data is a giant book with millions of pages. There are two types of ways to navigate each with their own pros and cons... 

#### **Offset-based pagination** ```GET /api/products/offset```
Aka "skip pagination" is a method where you can both turn and jump pages as well. This means that you ask the API for "page 5" and it knows to skip the first four pages and skip to the 5th page of content. This is known as *Random Access*. 

* The Pros: It's simple and intuitive. Users can easily jump to any page of content they want.

* The Cons: When a dataset scales this method is a performance bottleneck. As the dataset grows, the database has to scan and skip a massive number of rows, which can be very slow. It also leads to inconsistent results if new data is added while a user is paginating.

#### Offset Demo
See express route —> ```GET /api/products/offset``` it is an endpoint that takes two parameters: ```page``` and ```limit```. The server calculates an offset (```  const offset = (page - 1) * limit;```) and returns a slice of the data. 

* page - 1: The "page" number is what the user sees (like "Page 2"). We subtract 1 as computers count from zero, so "Page 2" is really the "first page *after* the first page."

* limit: The "limit" is the number of items you want on each page. We multiply the page number by the limit to figure out how many total items to skip to get to the correct page.

```
http://localhost:3000/api/products/offset?page=2&limit=10
```
_

#### **Cursor-based pagination** ```(/api/products/cursor):```
How it works: This method uses a cursor (the id of the last item from the previous request) to get the next set of items. Instead of just telling the server what "page number" to go to, you're giving it a specific item as a starting point. This improves performance, speed, and is a reliable way to handle pagination, especially when new items are constantly being added to the database.
 
* Pros: It is the modern best-practice approach and performs great at scale. The database can jump directly to the next item using an index, which is much faster. It's also more reliable for real-time data as it prevents pages from shifting if new data is added. 

* Cons: It is more complex to implement and it doesn't allow for random access to a specific page.

#### Cursor Demo
See express route —> ```GET /api/products/cursor```

```http://localhost:3000/api/products/cursor?limit=10 ```
This request has no cursor, so the server starts at the beginning and gives you the first 10 products. 

```http://localhost:3000/api/products/cursor?limit=10&after=10```
The after=10 parameter is the cursor. It tells the server to find the product with ID 10 and then return the next 10 products that come immediately after it.

***Cursor-Based Pagination Implementation Notes:***
1- Determne cursor, sorting order of cursor column, and direction of pagination (we're taking records that are greater or less than the cursor)
2- Can only work on sequential DB columns such as ID or timestamp (I'm using json not a DB)
3- Fetch records
4- Determine new, next and prev cursors

_ 


### Conclusion: From a Technical Detail to a Strategic Decision
While offset-based pagination is a perfectly acceptable choice for a smaller company, for a high-scale ecommerce platform focused on APIs as a key service to deliver massive amounts of data, the trade-off is clear. The long-term value of a reliable and performant API far outweighs the short-term convenience of a simple implementation.

This project taught me that a technical detail like pagination is actually a critical strategic decision. For a mature platform, a TPM needs to make a long-term architectural decision that prioritizes performance and reliability and understands what's happening under the hood. 




Sources: 
https://www.youtube.com/watch?v=Ynp6Gdd3XVE
https://www.youtube.com/watch?v=mYQfslCJ5KM
https://dev.to/emmabase/how-to-implement-pagination-on-api-endpoint-using-nodejs-and-typescript-43e5
https://www.youtube.com/watch?v=cmg4Hmtufec


