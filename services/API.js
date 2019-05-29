import serviceBase from "./serviceBase";

const productService = {
  /**
   * Gets current user
   * @returns {*}
   */
  //these are sample api call's
  //put api
  updateContentTypesData: (url, data) =>
    serviceBase.put("/fusecruds/putmodel/" + url, data), //content-manager update
  updateNewContentType: (url, data) =>
    serviceBase.put("/content-manager/explorer/pages/" + url, data), //content-type-builder (new page) update
  //post api
  launchSite: data => serviceBase.post("/launch", data), // Launch site
  registerAffiliates: data => serviceBase.post("/shoojus/addaffiliate", data), // Affiliate register
  addTemplateToUser: data => serviceBase.post("/shoojus/addtemplates", data), // Add template to chapter
  siteIncrement: data => serviceBase.post("/shoojus/siteincrement", data), // Site Increment
  registerStrapiUser: data => serviceBase.post("/auth/local/register", data), // Registration / Login
  createContentTypesData: (url, data) =>
    serviceBase.post("/fusecruds/addmodel/" + url, data), // Add data to content-manager
  addBlogs: data => serviceBase.post("/shoojus/addblogs", data), // not in use
  affilateCreateBlog: data => serviceBase.post("/blogs", data), // not in use
  affilateCreateEvent: data => serviceBase.post("/events", data), // not in use
  createNewContentType: data =>
    serviceBase.post("/content-manager/explorer/pages", data), // Create new content-type-builder (new page)
  createChapters: data => serviceBase.post("/shoojus/addChapters", data), // Add Chapters
  getSiteconfigbyChapter: data =>
    serviceBase.post("/shoojus/getSiteconfigbyChapter", data), // Get site config by chapter in affiliate page
  getChaptersbyAdmin: data =>
    serviceBase.post("/shoojus/getChaptersbyAdmin", data), // Get chapters by admin
  //get api
  getAffiliatesOnOrginasation: organisation =>
    serviceBase.get("/shoojus/affiliates/" + organisation), // Get affiliates list by login organisation
  getSiteIncrement: () => serviceBase.get("/shoojus/parent"), // Dashboard page content
  getAscaAffiliatesContent1: () => serviceBase.get("/shoojus/affiliate"), // not in use
  getAscaAffiliatesContent2: () => serviceBase.get("/shoojus/affiliate1"), // not in use
  getAscaAffiliatesContent3: () => serviceBase.get("/shoojus/affiliate2"), // not in use
  getAffiliatesBySeries: series => serviceBase.get("/shoojus/series/" + series), //NYSSCA_AFFILIATES // not in use
  getBlogsData: () => serviceBase.get("/blogs"), // not in use
  getEventsData: () => serviceBase.get("/events"), // not in use
  getContentTypes: () => serviceBase.get("/content-manager/explorer/pages"), // Get all pages created
  getOneContentTypes: url =>
    serviceBase.get("/content-manager/explorer/pages/" + url), // Get one page by Id
  getDataContentTypes: model => serviceBase.get("/fusecruds/getmodel/" + model), // Get page data by model name

  //delete API
  deleteContent: (model, id, chapter) =>
    serviceBase.delete(
      "/fusecruds/deletemodel/" + chapter + "/" + model + "/" + id
    ), // Delete data
  getChapters: () => serviceBase.get("/shoojus/getChapters") // not in use
};
export default productService;
