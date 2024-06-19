import React from "react";

const Error404  = ()=>{
    return (
        <section className="flex items-center h-screen p-16 bg-white">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <div className="bg-center bg-no-repeat bg-cover h-96" style={{ backgroundImage: "url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)" }}>
            <h1 className="text-9xl font-bold">404</h1>
          </div>
          <div className="mt-0">
            <h2 className="mb-4 text-3xl font-semibold">Look like you're lost</h2>
            <p className="mb-8">The page you are looking for is not available!</p>
            <a href="/" className="px-8 py-3 font-semibold text-white bg-green-600 rounded">Go to Home</a>
          </div>
        </div>
      </div>
    </section>
      );
}

export default Error404