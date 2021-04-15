// membuat async handler agar sebuat sintaks async tidak perlu dimasukan kedalam block trycatch
const AsyncHandler = (ControllerFunctions) => (request, response, next) => {
    Promise.resolve(ControllerFunctions(request, response, next)).catch(next)
}

module.exports = AsyncHandler