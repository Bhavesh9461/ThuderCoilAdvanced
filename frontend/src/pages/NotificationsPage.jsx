import React from "react";
import {
  useAcceptFriendRequest,
  useGetFriendRequests,
} from "../hooks/useFriendRequests";
import { BellIcon, ClockIcon, MessageSquareIcon, UserCheckIcon } from "lucide-react";
import NoNotificationsFound from "../components/NoNotificationsFound";

const NotificationsPage = () => {
  const { friendRequests, isLoading } = useGetFriendRequests();
  const { acceptRequestMutation, isPending } = useAcceptFriendRequest();

  const incomingRequests = friendRequests?.incomingReqs || [];
  const acceptedRequests = friendRequests?.acceptedReqs || [];

  return (
    <div className="p-4 sm:p-6 lg: p-8" >
      <div className="container mx-auto max-w-7xl space-y-8" >
        <h1 className='text-2xl sm:text-3xl font-bold tracking-tight mb-6'>Notifications</h1>

        {isLoading ? (
          <div className='flex justify-center py-12'>
            <span className="loading loading-spinner loading-lg" />
          </div>
        ) : (
          <>
            {incomingRequests.length > 0 &&  (
              <section className="space-y-4" >
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <UserCheckIcon className="w-5 h-5 text-primary" />
                  Friend Requests
                  <span className="badge badge-primary ml-2">{incomingRequests.length}</span>
                </h2>

                <div className='space-y-3'>
                {incomingRequests.map((request)=> (
                  <div key={request._id} className="card bg-base-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="card-body p-4">
                      <div className="flex items-center justify-between">
                        {/* USERS INFO */}
                        <div className="flex items-center gap-3 ">

                          {/* IMAGE PROFILE */}
                          <div className="avatar w-14 h-14 rounded-full bg-base-300" >
                            <img className="rounded-full" src={request.sender.profilePic} alt={request.sender.fullName} />
                          </div>

                          <div>
                            <h3 className="font-semibold" >{request.sender.userName}</h3>
                            <div className="flex flex-wrap gap-1.5 mt-1">
                              <span className='badge badge-neutral px-2 py-2 font-semibold badge-sm'>
                                Skill: {request.sender.skill}
                              </span>

                              <span className='badge badge-neutral font-semibold px-2 py-2 badge-sm'>
                                Language: {request.sender.language}
                              </span>
                            </div>
                          </div>

                        </div>

                        {/* ACCEPT BUTTON */}
                        <button className="btn btn-primary btn-sm"
                         onClick={() => {acceptRequestMutation(request._id)}}
                         disabled={isPending}
                        >
                          Accept
                        </button>

                      </div>
                    </div>
                  </div>
                ))}
                </div>

              </section>
            )}

            {/* ACCEPTED REQUESTS NOTIFICATIONS */}
            {acceptedRequests.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2" >
                  <BellIcon className="h-5 w-5 text-success" />
                  New Connections
                </h2>

                {/* USERS INFO */}
                <div className="space-y-3">
                  {acceptedRequests.map((notification)=>(
                    <div key={notification._id} className="card bg-base-200 shadow-sm" >
                      <div className="card-body p-4">
                        
                        <div className="flex items-start gap-3">
                          {/* PROFILE IMAGE DIV */}
                          <div className="avatar mt-1 size-10 rounded-full">
                            <img src={notification.recipient.profilePic} alt={notification.recipient.fullName} />
                          </div>

                          <div className='flex-1'>
                            <h3 className="font-semibold" >{notification.recipient.userName}</h3>
                            <p className='text-sm my-1'>
                              {notification.recipient.fullName} accepted your friend request
                            </p>
                            <p className="text-xs flex items-center opacity-70">
                              <ClockIcon className="w-3 h-3 mr-1" />
                              Recently
                            </p>
                          </div>

                          <div className="badge badge-success">
                            <MessageSquareIcon className="h-3 w-3 mr-1" />
                            New Friend
                          </div>

                        </div>

                      </div>
                    </div>
                  ))}
                </div>

              </section>
            )}

            {/* SHOW SOMETHING WHEN THERE IS NO NOTIFICATIONS */}
            {incomingRequests.length === 0 && acceptedRequests.length === 0 && (
              <NoNotificationsFound />
            )}

          </>
        ) }
      </div>

    </div>
  )
};

export default NotificationsPage;
