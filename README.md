Why Pagination?

Sources: 
https://www.youtube.com/watch?v=Ynp6Gdd3XVE
https://www.youtube.com/watch?v=mYQfslCJ5KM
https://dev.to/emmabase/how-to-implement-pagination-on-api-endpoint-using-nodejs-and-typescript-43e5
https://www.youtube.com/watch?v=cmg4Hmtufec

When working with large data such as product catalogs an API call would result in thousands of returns. Returning all data at once is not practical for a single call.  Pagination is an API design pattern that enables us to present information to a user incrementally in chunks to improve user experience. It is an answer to memory constraints that would cause bottlenecks and slow sites, to try and retrieve all data at once from the database at this scale. 

As an analogy we can imagine an API's data is a giant book with millions of pages.

Offset-based pagination is like turning pages. You ask the API for "page 5" and it knows to skip the first four pages and give you the next one. This is called Random Access. 

Cursor-based pagination is like a GPS. You ask the API for "the next 10 items after this last one." The API hands you a special key (a cursor) that points to the last item you saw.


Pros and Cons of Each Approach
Offset-Based or "Skip" Pagination (The "Pages" Method):

Pros:
Simple to implement: It's easy-to-understand concept for both developers and PMs.
Random Access: It allows for random access to any page (for instance, "go to page 5").

Cons:
Faulty Performance at Scale: This is the big issue. As the dataset grows, the database has to scan and skip a large number of rows to find the starting point for each page, which can be very slow.

Inaccurate Results: If new data is added or removed while a user is paginating, the pages can "shift," causing the user to either see duplicate items or miss items entirely.


Cursor-Based Pagination Notes
Can only work on sequential columns such as ID or timestamp 
paginate forward use ascending order
to get the records in reverse order (or previous page) we need to get the records that are less than the previous cursor
Get one more record than we need and reassign previous and next cursor. 
