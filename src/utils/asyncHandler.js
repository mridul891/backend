// Define a function called asyncHandler which takes a requestHandler function as input.
const asyncHandler = (requestHandler) => {
    // Return another function which takes req, res, and next as parameters.
    return (req, res, next) => {
        // Wrap the execution of requestHandler inside a Promise to handle asynchronous operations.
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
    }
}

// Export asyncHandler for external use.
export { asyncHandler }

// This function is a higher-order function, meaning it can accept functions as parameters.

// The following are some examples of how asyncHandler can be used:

// 1. No parameter example:
// const asyncHandler = () =>{}

// 2. Parameter is a function example:
// const asyncHandler = (func) => () =>{}

// 3. Parameter is a function and returns an async function example:
// const asyncHandler = (func) => async () =>{}

// Another implementation using async/await and error handling:

// const asyncHandler = (fn) => async (req, res, next) => {
//     try {
//         // Execute the provided function fn asynchronously.
//         await fn(req, res, next)
//     } catch (error) {
//         // If an error occurs, send an appropriate response.
//         res.status(err.code || 500).json({
//             success: false,
//             message: err.message
//         })
//     }
// }
