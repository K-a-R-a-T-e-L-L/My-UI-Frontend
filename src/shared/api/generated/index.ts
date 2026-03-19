export type { GetHelloQueryKey } from "./hooks/appController/useGetHello";
export type { CompleteTelegramLoginMutationKey } from "./hooks/authController/useCompleteTelegramLogin";
export type { CompleteUsernameLoginMutationKey } from "./hooks/authController/useCompleteUsernameLogin";
export type { ConfirmTelegramLoginFromBotMutationKey } from "./hooks/authController/useConfirmTelegramLoginFromBot";
export type { GetTelegramStatusQueryKey } from "./hooks/authController/useGetTelegramStatus";
export type { HandleTelegramWebhookMutationKey } from "./hooks/authController/useHandleTelegramWebhook";
export type { LogoutMutationKey } from "./hooks/authController/useLogout";
export type { MeQueryKey } from "./hooks/authController/useMe";
export type { RefreshMutationKey } from "./hooks/authController/useRefresh";
export type { StartTelegramLoginMutationKey } from "./hooks/authController/useStartTelegramLogin";
export type { StartUsernameLoginMutationKey } from "./hooks/authController/useStartUsernameLogin";
export type { UpdateMeMutationKey } from "./hooks/authController/useUpdateMe";
export type { UploadMeAvatarMutationKey } from "./hooks/authController/useUploadMeAvatar";
export type { GetDailyCopiesQueryKey } from "./hooks/metricsController/useGetDailyCopies";
export type { GetOverviewQueryKey } from "./hooks/metricsController/useGetOverview";
export type { ArchiveTemplateMutationKey } from "./hooks/templatesController/useArchiveTemplate";
export type { CopyTemplateCodeMutationKey } from "./hooks/templatesController/useCopyTemplateCode";
export type { CreateTemplateMutationKey } from "./hooks/templatesController/useCreateTemplate";
export type { DeleteTemplateMutationKey } from "./hooks/templatesController/useDeleteTemplate";
export type { GetCategoriesQueryKey } from "./hooks/templatesController/useGetCategories";
export type { GetMyFavoritesQueryKey } from "./hooks/templatesController/useGetMyFavorites";
export type { GetMyTemplatesQueryKey } from "./hooks/templatesController/useGetMyTemplates";
export type { GetTemplateByIdQueryKey } from "./hooks/templatesController/useGetTemplateById";
export type { GetTemplatesQueryKey } from "./hooks/templatesController/useGetTemplates";
export type { LikeTemplateMutationKey } from "./hooks/templatesController/useLikeTemplate";
export type { PublishRequestMutationKey } from "./hooks/templatesController/usePublishRequest";
export type { UnlikeTemplateMutationKey } from "./hooks/templatesController/useUnlikeTemplate";
export type { UpdateTemplateMutationKey } from "./hooks/templatesController/useUpdateTemplate";
export type { UploadPreviewMutationKey } from "./hooks/templatesController/useUploadPreview";
export type {
  ArchiveTemplate201,
  ArchiveTemplateMutation,
  ArchiveTemplateMutationResponse,
  ArchiveTemplatePathParams,
} from "./types/ArchiveTemplate";
export type {
  CompleteTelegramLogin201,
  CompleteTelegramLoginMutation,
  CompleteTelegramLoginMutationRequest,
  CompleteTelegramLoginMutationResponse,
} from "./types/CompleteTelegramLogin";
export type { CompleteTelegramLoginDto } from "./types/CompleteTelegramLoginDto";
export type {
  CompleteUsernameLogin201,
  CompleteUsernameLoginMutation,
  CompleteUsernameLoginMutationRequest,
  CompleteUsernameLoginMutationResponse,
} from "./types/CompleteUsernameLogin";
export type { CompleteUsernameLoginDto } from "./types/CompleteUsernameLoginDto";
export type {
  ConfirmTelegramLoginFromBot201,
  ConfirmTelegramLoginFromBotHeaderParams,
  ConfirmTelegramLoginFromBotMutation,
  ConfirmTelegramLoginFromBotMutationRequest,
  ConfirmTelegramLoginFromBotMutationResponse,
} from "./types/ConfirmTelegramLoginFromBot";
export type {
  CopyTemplateCode201,
  CopyTemplateCodeMutation,
  CopyTemplateCodeMutationResponse,
  CopyTemplateCodePathParams,
} from "./types/CopyTemplateCode";
export type {
  CreateTemplate201,
  CreateTemplateMutation,
  CreateTemplateMutationRequest,
  CreateTemplateMutationResponse,
} from "./types/CreateTemplate";
export type { CreateTemplateDto } from "./types/CreateTemplateDto";
export type {
  DeleteTemplate200,
  DeleteTemplateMutation,
  DeleteTemplateMutationResponse,
  DeleteTemplatePathParams,
} from "./types/DeleteTemplate";
export type {
  GetCategories200,
  GetCategoriesQuery,
  GetCategoriesQueryResponse,
} from "./types/GetCategories";
export type {
  GetDailyCopies200,
  GetDailyCopiesQuery,
  GetDailyCopiesQueryParams,
  GetDailyCopiesQueryResponse,
} from "./types/GetDailyCopies";
export type {
  GetHello200,
  GetHelloQuery,
  GetHelloQueryResponse,
} from "./types/GetHello";
export type {
  GetMyFavorites200,
  GetMyFavoritesQuery,
  GetMyFavoritesQueryResponse,
} from "./types/GetMyFavorites";
export type {
  GetMyTemplates200,
  GetMyTemplatesQuery,
  GetMyTemplatesQueryResponse,
} from "./types/GetMyTemplates";
export type {
  GetOverview200,
  GetOverviewQuery,
  GetOverviewQueryResponse,
} from "./types/GetOverview";
export type {
  GetTelegramStatus200,
  GetTelegramStatusPathParams,
  GetTelegramStatusQuery,
  GetTelegramStatusQueryResponse,
} from "./types/GetTelegramStatus";
export type {
  GetTemplateById200,
  GetTemplateByIdPathParams,
  GetTemplateByIdQuery,
  GetTemplateByIdQueryResponse,
} from "./types/GetTemplateById";
export type {
  GetTemplates200,
  GetTemplatesQuery,
  GetTemplatesQueryResponse,
} from "./types/GetTemplates";
export type {
  HandleTelegramWebhook200,
  HandleTelegramWebhookHeaderParams,
  HandleTelegramWebhookMutation,
  HandleTelegramWebhookMutationResponse,
} from "./types/HandleTelegramWebhook";
export type {
  LikeTemplate201,
  LikeTemplateMutation,
  LikeTemplateMutationResponse,
  LikeTemplatePathParams,
} from "./types/LikeTemplate";
export type {
  Logout200,
  LogoutMutation,
  LogoutMutationResponse,
} from "./types/Logout";
export type { Me200, MeQuery, MeQueryResponse } from "./types/Me";
export type {
  PublishRequest201,
  PublishRequestMutation,
  PublishRequestMutationResponse,
  PublishRequestPathParams,
} from "./types/PublishRequest";
export type {
  Refresh200,
  RefreshMutation,
  RefreshMutationResponse,
} from "./types/Refresh";
export type {
  StartTelegramLogin201,
  StartTelegramLoginMutation,
  StartTelegramLoginMutationResponse,
} from "./types/StartTelegramLogin";
export type {
  StartUsernameLogin201,
  StartUsernameLoginMutation,
  StartUsernameLoginMutationRequest,
  StartUsernameLoginMutationResponse,
} from "./types/StartUsernameLogin";
export type { StartUsernameLoginDto } from "./types/StartUsernameLoginDto";
export type { TelegramBotConfirmDto } from "./types/TelegramBotConfirmDto";
export type {
  UnlikeTemplate200,
  UnlikeTemplateMutation,
  UnlikeTemplateMutationResponse,
  UnlikeTemplatePathParams,
} from "./types/UnlikeTemplate";
export type {
  UpdateMe200,
  UpdateMeMutation,
  UpdateMeMutationRequest,
  UpdateMeMutationResponse,
} from "./types/UpdateMe";
export type { UpdateProfileDto } from "./types/UpdateProfileDto";
export type {
  UpdateTemplate200,
  UpdateTemplateMutation,
  UpdateTemplateMutationRequest,
  UpdateTemplateMutationResponse,
  UpdateTemplatePathParams,
} from "./types/UpdateTemplate";
export type { UpdateTemplateDto } from "./types/UpdateTemplateDto";
export type {
  UploadMeAvatar201,
  UploadMeAvatarMutation,
  UploadMeAvatarMutationResponse,
} from "./types/UploadMeAvatar";
export type {
  UploadPreview201,
  UploadPreviewMutation,
  UploadPreviewMutationResponse,
} from "./types/UploadPreview";
export { getHello } from "./clients/appController/getHello";
export { completeTelegramLogin } from "./clients/authController/completeTelegramLogin";
export { completeUsernameLogin } from "./clients/authController/completeUsernameLogin";
export { confirmTelegramLoginFromBot } from "./clients/authController/confirmTelegramLoginFromBot";
export { getTelegramStatus } from "./clients/authController/getTelegramStatus";
export { handleTelegramWebhook } from "./clients/authController/handleTelegramWebhook";
export { logout } from "./clients/authController/logout";
export { me } from "./clients/authController/me";
export { refresh } from "./clients/authController/refresh";
export { startTelegramLogin } from "./clients/authController/startTelegramLogin";
export { startUsernameLogin } from "./clients/authController/startUsernameLogin";
export { updateMe } from "./clients/authController/updateMe";
export { uploadMeAvatar } from "./clients/authController/uploadMeAvatar";
export { getDailyCopies } from "./clients/metricsController/getDailyCopies";
export { getOverview } from "./clients/metricsController/getOverview";
export { operations } from "./clients/operations";
export { archiveTemplate } from "./clients/templatesController/archiveTemplate";
export { copyTemplateCode } from "./clients/templatesController/copyTemplateCode";
export { createTemplate } from "./clients/templatesController/createTemplate";
export { deleteTemplate } from "./clients/templatesController/deleteTemplate";
export { getCategories } from "./clients/templatesController/getCategories";
export { getMyFavorites } from "./clients/templatesController/getMyFavorites";
export { getMyTemplates } from "./clients/templatesController/getMyTemplates";
export { getTemplateById } from "./clients/templatesController/getTemplateById";
export { getTemplates } from "./clients/templatesController/getTemplates";
export { likeTemplate } from "./clients/templatesController/likeTemplate";
export { publishRequest } from "./clients/templatesController/publishRequest";
export { unlikeTemplate } from "./clients/templatesController/unlikeTemplate";
export { updateTemplate } from "./clients/templatesController/updateTemplate";
export { uploadPreview } from "./clients/templatesController/uploadPreview";
export { getHelloQueryKey } from "./hooks/appController/useGetHello";
export { getHelloQueryOptions } from "./hooks/appController/useGetHello";
export { useGetHello } from "./hooks/appController/useGetHello";
export { completeTelegramLoginMutationKey } from "./hooks/authController/useCompleteTelegramLogin";
export { completeTelegramLoginMutationOptions } from "./hooks/authController/useCompleteTelegramLogin";
export { useCompleteTelegramLogin } from "./hooks/authController/useCompleteTelegramLogin";
export { completeUsernameLoginMutationKey } from "./hooks/authController/useCompleteUsernameLogin";
export { completeUsernameLoginMutationOptions } from "./hooks/authController/useCompleteUsernameLogin";
export { useCompleteUsernameLogin } from "./hooks/authController/useCompleteUsernameLogin";
export { confirmTelegramLoginFromBotMutationKey } from "./hooks/authController/useConfirmTelegramLoginFromBot";
export { confirmTelegramLoginFromBotMutationOptions } from "./hooks/authController/useConfirmTelegramLoginFromBot";
export { useConfirmTelegramLoginFromBot } from "./hooks/authController/useConfirmTelegramLoginFromBot";
export { getTelegramStatusQueryKey } from "./hooks/authController/useGetTelegramStatus";
export { getTelegramStatusQueryOptions } from "./hooks/authController/useGetTelegramStatus";
export { useGetTelegramStatus } from "./hooks/authController/useGetTelegramStatus";
export { handleTelegramWebhookMutationKey } from "./hooks/authController/useHandleTelegramWebhook";
export { handleTelegramWebhookMutationOptions } from "./hooks/authController/useHandleTelegramWebhook";
export { useHandleTelegramWebhook } from "./hooks/authController/useHandleTelegramWebhook";
export { logoutMutationKey } from "./hooks/authController/useLogout";
export { logoutMutationOptions } from "./hooks/authController/useLogout";
export { useLogout } from "./hooks/authController/useLogout";
export { meQueryKey } from "./hooks/authController/useMe";
export { meQueryOptions } from "./hooks/authController/useMe";
export { useMe } from "./hooks/authController/useMe";
export { refreshMutationKey } from "./hooks/authController/useRefresh";
export { refreshMutationOptions } from "./hooks/authController/useRefresh";
export { useRefresh } from "./hooks/authController/useRefresh";
export { startTelegramLoginMutationKey } from "./hooks/authController/useStartTelegramLogin";
export { startTelegramLoginMutationOptions } from "./hooks/authController/useStartTelegramLogin";
export { useStartTelegramLogin } from "./hooks/authController/useStartTelegramLogin";
export { startUsernameLoginMutationKey } from "./hooks/authController/useStartUsernameLogin";
export { startUsernameLoginMutationOptions } from "./hooks/authController/useStartUsernameLogin";
export { useStartUsernameLogin } from "./hooks/authController/useStartUsernameLogin";
export { updateMeMutationKey } from "./hooks/authController/useUpdateMe";
export { updateMeMutationOptions } from "./hooks/authController/useUpdateMe";
export { useUpdateMe } from "./hooks/authController/useUpdateMe";
export { uploadMeAvatarMutationKey } from "./hooks/authController/useUploadMeAvatar";
export { uploadMeAvatarMutationOptions } from "./hooks/authController/useUploadMeAvatar";
export { useUploadMeAvatar } from "./hooks/authController/useUploadMeAvatar";
export { getDailyCopiesQueryKey } from "./hooks/metricsController/useGetDailyCopies";
export { getDailyCopiesQueryOptions } from "./hooks/metricsController/useGetDailyCopies";
export { useGetDailyCopies } from "./hooks/metricsController/useGetDailyCopies";
export { getOverviewQueryKey } from "./hooks/metricsController/useGetOverview";
export { getOverviewQueryOptions } from "./hooks/metricsController/useGetOverview";
export { useGetOverview } from "./hooks/metricsController/useGetOverview";
export { archiveTemplateMutationKey } from "./hooks/templatesController/useArchiveTemplate";
export { archiveTemplateMutationOptions } from "./hooks/templatesController/useArchiveTemplate";
export { useArchiveTemplate } from "./hooks/templatesController/useArchiveTemplate";
export { copyTemplateCodeMutationKey } from "./hooks/templatesController/useCopyTemplateCode";
export { copyTemplateCodeMutationOptions } from "./hooks/templatesController/useCopyTemplateCode";
export { useCopyTemplateCode } from "./hooks/templatesController/useCopyTemplateCode";
export { createTemplateMutationKey } from "./hooks/templatesController/useCreateTemplate";
export { createTemplateMutationOptions } from "./hooks/templatesController/useCreateTemplate";
export { useCreateTemplate } from "./hooks/templatesController/useCreateTemplate";
export { deleteTemplateMutationKey } from "./hooks/templatesController/useDeleteTemplate";
export { deleteTemplateMutationOptions } from "./hooks/templatesController/useDeleteTemplate";
export { useDeleteTemplate } from "./hooks/templatesController/useDeleteTemplate";
export { getCategoriesQueryKey } from "./hooks/templatesController/useGetCategories";
export { getCategoriesQueryOptions } from "./hooks/templatesController/useGetCategories";
export { useGetCategories } from "./hooks/templatesController/useGetCategories";
export { getMyFavoritesQueryKey } from "./hooks/templatesController/useGetMyFavorites";
export { getMyFavoritesQueryOptions } from "./hooks/templatesController/useGetMyFavorites";
export { useGetMyFavorites } from "./hooks/templatesController/useGetMyFavorites";
export { getMyTemplatesQueryKey } from "./hooks/templatesController/useGetMyTemplates";
export { getMyTemplatesQueryOptions } from "./hooks/templatesController/useGetMyTemplates";
export { useGetMyTemplates } from "./hooks/templatesController/useGetMyTemplates";
export { getTemplateByIdQueryKey } from "./hooks/templatesController/useGetTemplateById";
export { getTemplateByIdQueryOptions } from "./hooks/templatesController/useGetTemplateById";
export { useGetTemplateById } from "./hooks/templatesController/useGetTemplateById";
export { getTemplatesQueryKey } from "./hooks/templatesController/useGetTemplates";
export { getTemplatesQueryOptions } from "./hooks/templatesController/useGetTemplates";
export { useGetTemplates } from "./hooks/templatesController/useGetTemplates";
export { likeTemplateMutationKey } from "./hooks/templatesController/useLikeTemplate";
export { likeTemplateMutationOptions } from "./hooks/templatesController/useLikeTemplate";
export { useLikeTemplate } from "./hooks/templatesController/useLikeTemplate";
export { publishRequestMutationKey } from "./hooks/templatesController/usePublishRequest";
export { publishRequestMutationOptions } from "./hooks/templatesController/usePublishRequest";
export { usePublishRequest } from "./hooks/templatesController/usePublishRequest";
export { unlikeTemplateMutationKey } from "./hooks/templatesController/useUnlikeTemplate";
export { unlikeTemplateMutationOptions } from "./hooks/templatesController/useUnlikeTemplate";
export { useUnlikeTemplate } from "./hooks/templatesController/useUnlikeTemplate";
export { updateTemplateMutationKey } from "./hooks/templatesController/useUpdateTemplate";
export { updateTemplateMutationOptions } from "./hooks/templatesController/useUpdateTemplate";
export { useUpdateTemplate } from "./hooks/templatesController/useUpdateTemplate";
export { uploadPreviewMutationKey } from "./hooks/templatesController/useUploadPreview";
export { uploadPreviewMutationOptions } from "./hooks/templatesController/useUploadPreview";
export { useUploadPreview } from "./hooks/templatesController/useUploadPreview";
