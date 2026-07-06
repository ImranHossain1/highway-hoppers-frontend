import { IMeta, ISchedule } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const USER_PROFILE_API = "/user";
export const scheduleApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userProfile: build.query({
      query: (id) => ({
        url: `${USER_PROFILE_API}/user-profile`,
        method: "GET",
      }),
      providesTags: [tagTypes.profile],
    }),
    myProfile: build.query({
      query: () => ({
        url: `${USER_PROFILE_API}/my-profile`,
        method: "GET",
      }),
      providesTags: [tagTypes.profile],
    }),
    updateProfile: build.mutation({
      query: (data) => ({
        url: `${USER_PROFILE_API}/update-profile`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.profile],
    }),
  }),
});

export const {
  useUserProfileQuery,
  useMyProfileQuery,
  useUpdateProfileMutation,
} = scheduleApi;
