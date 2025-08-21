import React from 'react';
import { useSelector } from 'react-redux';
import { useEffect,useState } from 'react';
import unknownuser from "../../assets/unknownuser.webp"

const OwnerProfileCard = () => {
  const user = useSelector((state)=>state.Auth.user);
  const profileimage = user?.profilepic || unknownuser


  return (
      <div class="max-w-sm">
  <div class="rounded-lg  bg-white dark:bg-black px-4 p-5  shadow-lg">
    <div class="relative mx-auto w-24 h-24 rounded-full">
      <span class="absolute right-0 m-3 h-3 w-3 rounded-full bg-green-500 ring-2 ring-green-300 ring-offset-2"></span>
      <img class="mx-auto w-full h-full rounded-full" src={profileimage} alt="profile image" />
    </div>
    <div className='flex flex-col gap-1'>
    <h1 class="my-1 text-center text-xl font-bold leading-8 dark:text-white text-gray-900">{user?.name}</h1>
    <h3 class="font-lg text-semibold text-center leading-6 dark:text-white text-gray-600">Owner Id :{user?._id.slice(0,8)}</h3>
    </div>
 
  </div>
</div>
  );
}

export default OwnerProfileCard
