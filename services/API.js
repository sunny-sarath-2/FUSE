import serviceBase from "./serviceBase";

const productService = {
  /**
   * Gets current user
   * @returns {*}
   */
  //these are sample api call's
  //post api
  registerAffiliates: data => serviceBase.post("/shoojus/addaffiliate", data),
  addTemplateToUser: data => serviceBase.post("/shoojus/addtemplates", data),
  siteIncrement: data => serviceBase.post("/shoojus/siteincrement", data),
  registerStrapiUser: data => serviceBase.post("/auth/local/register", data),
  //
  addBlogs: data => serviceBase.post("/shoojus/addblogs", data),
  affilateCreateBlog: data => serviceBase.post("/blogs", data),
  affilateCreateEvent: data => serviceBase.post("/events", data),
  //get api
  getAffiliatesOnOrginasation: organisation =>
    serviceBase.get("/shoojus/affiliates/" + organisation),
  getEvents: () => serviceBase.get("/shoojus/event1"),
  getSiteIncrement: () => serviceBase.get("/shoojus/parent"),
  getAscaAffiliatesContent1: () => serviceBase.get("/shoojus/affiliate"),
  getAscaAffiliatesContent2: () => serviceBase.get("/shoojus/affiliate1"),
  getAscaAffiliatesContent3: () => serviceBase.get("/shoojus/affiliate2"),
  getChapters: () => serviceBase.get("/shoojus/chapters_affiliates"),
  getAffiliatesBySeries: series => serviceBase.get("/shoojus/series/" + series), //NYSSCA_AFFILIATES
  //
  getBlogsData: () => serviceBase.get("/blogs")
};
export default productService;
