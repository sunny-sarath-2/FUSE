import serviceBase from "./serviceBase";

const productService = {
  /**
   * Gets current user
   * @returns {*}
   */
  //these are sample api call's
  //put api
  updateContentTypesData: (url, data) =>
    serviceBase.put("/content-manager/explorer/" + url, data),
  updateNewContentType: (url, data) =>
    serviceBase.put("/content-type-builder/models/" + url, data),
  //post api
  launchSite: data => serviceBase.post("/launch", data),
  registerAffiliates: data => serviceBase.post("/shoojus/addaffiliate", data),
  addTemplateToUser: data => serviceBase.post("/shoojus/addtemplates", data),
  siteIncrement: data => serviceBase.post("/shoojus/siteincrement", data),
  registerStrapiUser: data => serviceBase.post("/auth/local/register", data),
  createContentTypesData: (url, data) =>
    serviceBase.post("/content-manager/explorer/" + url, data),
  addBlogs: data => serviceBase.post("/shoojus/addblogs", data),
  affilateCreateBlog: data => serviceBase.post("/blogs", data),
  affilateCreateEvent: data => serviceBase.post("/events", data),
  createNewContentType: data =>
    serviceBase.post("/content-type-builder/models", data),
  createChapters: data => serviceBase.post("/shoojus/addChapters", data),
  getSiteconfigbyChapter: data =>
    serviceBase.post("/shoojus/getSiteconfigbyChapter", data),
  //get api
  getAffiliatesOnOrginasation: organisation =>
    serviceBase.get("/shoojus/affiliates/" + organisation),
  getSiteIncrement: () => serviceBase.get("/shoojus/parent"),
  getAscaAffiliatesContent1: () => serviceBase.get("/shoojus/affiliate"),
  getAscaAffiliatesContent2: () => serviceBase.get("/shoojus/affiliate1"),
  getAscaAffiliatesContent3: () => serviceBase.get("/shoojus/affiliate2"),
  // getChapters: () => serviceBase.get("/shoojus/chapters_affiliates"),
  getAffiliatesBySeries: series => serviceBase.get("/shoojus/series/" + series), //NYSSCA_AFFILIATES
  getBlogsData: () => serviceBase.get("/blogs"),
  getEventsData: () => serviceBase.get("/events"),
  getContentTypes: () => serviceBase.get("/content-manager/models"),
  getOneContentTypes: url =>
    serviceBase.get("/content-type-builder/models/" + url),
  getDataContentTypes: model =>
    serviceBase.get("/content-manager/explorer/" + model),
  //delete API
  deleteContent: (model, id) =>
    serviceBase.delete("/content-manager/explorer/" + model + "/" + id),
  getChapters: () => serviceBase.get("/shoojus/getChapters")
};
export default productService;
