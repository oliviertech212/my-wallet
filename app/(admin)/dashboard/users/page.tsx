// "use client";
// import React, { useState, useEffect } from "react";
// import { toast } from "sonner";
// import axios from "axios";
// import { Button } from "@/components/ui/button";


// const Page = () => {
//   const [selecteduser,setSelecteduser ] = useState<any>();
//   const [isLoading, setIsLoading] = useState(false);



//   const topRef = React.useRef<HTMLDivElement>(null);

//   const token =
//     typeof window !== "undefined" && localStorage.getItem("usertoken");

//   const getallsales = async () => {
//     setIsLoading(true);
//     try {
//       const response = await axios.get("/api/users", {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       console.log("response", response);

   

//       setIsLoading(false);
//     } catch (error: any) {
//       setIsLoading(false);
//       toast.error(error?.error || "");
//     }
//   };

//   useEffect(() => {
//     if (typeof window !== "undefined" && localStorage.getItem("usertoken")) {
//       getallsales();
//     }
//   }, []);

//   return <div className="p-10">
//     "All users Table "
//   </div>;
// };

// export default Page;

