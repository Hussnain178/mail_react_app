import { baseApi } from ".";

export const companyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addCompany: builder.mutation({
      query: (payload) => ({
        url: "/add_company",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Company"],
    }),
    addCategory: builder.mutation({
      query: (payload) => ({
        url: "/add_category",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Category"],
    }),
    addSubscription: builder.mutation({
      query: (payload) => ({
        url: "/add_subcription",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Subscription"],
    }),
    addPrice: builder.mutation({
      query: (payload) => ({
        url: "/add_price",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Price"],
    }),
    getCompanies: builder.query({
      query: () => ({
        url: "/get_companies",
        method: "Get",
      }),
      providesTags: ["Company"],
    }),
    getCategories: builder.mutation({
      query: ({ csrf_token, company_name }) => ({
        url: "/get-categories", // ✅ your backend endpoint
        method: "POST",
        body: {
          company_name: company_name,
        },
      }),
   
      providesTags: ["Category"],
    }),
    getSubscriptions: builder.mutation({
      query: (payload) => ({
        url: "/get_subcriptions",
        method: "POST",
        body: payload,
      }),
      providesTags: ["Subscription"],
    }),
    getPrice: builder.mutation({
      query: (payload) => ({
        url: "/get_price",
        method: "POST",
        body: payload,
      }),
      providesTags: ["Price"],
    }),
  }),
});

export const {
  useAddCompanyMutation,
  useAddCategoryMutation,
  useAddSubscriptionMutation,
  useAddPriceMutation,
  useGetCompaniesQuery,
  useGetCategoriesMutation,
  useGetSubscriptionsMutation,
  useGetPriceMutation,
} = companyApi;
