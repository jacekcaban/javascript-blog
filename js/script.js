'use strict';

function titleClickHandler(event){
  const clickedElement = this;
  event.preventDefault();
  console.log('Link was clicked!');

  /* [done] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* [done] add class 'active' to the clicked link */
  clickedElement.classList.add('active');
  console.log('clickedElement:', clickedElement);

  /* [done] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts .active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* [done] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  console.log(articleSelector);

  /* [done] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);

  /* [done] add class 'active' to the correct article */
  targetArticle.classList.add('active');
}

const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}

// Generating title list

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optTagsListSelector = '.list .tags',
  optArticleAuthorSelector = '.post-author';

function generateTitleLinks(customSelector = ''){
  //console.log('customSelector =' ,customSelector = '');
  /* [done] remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* [done] for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  //console.log(optArticleSelector + customSelector);
  let html = '';

  for (let article of articles) {
    /* [done] get the article id */
    const articleId = article.getAttribute('id');

    /* [done] find the title element */
    /* [done] get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log(linkHTML);

    /* [done] insert link into titleList */
    //titleList.innerHTML = titleList.innerHTML + linkHTML;
    //titleList.insertAdjacentHTML('beforeend', linkHTML);

    /* [done] insert link into html variable */
    html = html + linkHTML;
  }
  titleList.innerHTML = html;
  console.log(html);

  const links = document.querySelectorAll('.titles a');
  console.log(links);

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

function generateTags(){
  /* [NEW] create a new variable allTags with an empty array
  let allTags = []; */
  /* [NEW] creat a new variable allTags with an empty object */
  let allTags = {};

  /* [done] find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles);

  /* [done] START LOOP: for every article: */
  for (let article of articles) {

    /* [done] find tags wrapper */
    const tagWrapper = article.querySelector(optArticleTagsSelector);
    console.log(tagWrapper);

    /* [done] make html variable with empty string */
    let html = '';

    /* [done] get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log(articleTags);

    /* [done] split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);

    /* [done] START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      console.log(tag);

      /* [done] generate HTML of the link */
      const linkHTML = '<li><a href="#' + 'tag-' + tag + '">' + tag + '</a></li>';
      console.log(linkHTML);

      /* [done] add generated code to html variable */
      html = html + linkHTML;

    /* [done] END LOOP: for each tag */
    /* [NEW] check if this link is NOT already in allTags */
    if(!allTags.hasOwnProperty(tag)){
      /* [NEW] tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      console.log(allTags);
    }
    /* [done] insert HTML of all the links into the tags wrapper */
    tagWrapper.innerHTML = html;
    console.log(tagWrapper);
  /* [done] END LOOP: for every article: */
  }

  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);

  /* [NEW] create variable for all links HTML code */
  let allTagsHTML = '';

  /* [NEW] START LOOP for each tag in allTags: */
  for(let tag in allTags){
    /* [NEW] generate code of a link and add it to allTagsHTML */
    allTagsHTML += tag + ' ('+ allTags[tag] + ') ';
  }

  /* [NEW] add html from allTags to tagList */
  tagList.innerHTML = allTagsHTML;
  //tagList.innerHTML = allTags.join(' ');
  console.log(allTags);
}
generateTags();

function tagClickHandler(event){
  /* [done] prevent default action for this event */
  event.preventDefault();

  /* [done] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* [done] make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* [done] make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-','');

  /* [done] find all tag links with class active */
  const tagActiveLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  /* [done] START LOOP: for each active tag link */
  for (let tagActiveLink of tagActiveLinks) {
    /* [done] remove class active */
    tagActiveLink.classList.remove('active');
  /* [done] END LOOP: for each active tag link */
  }

  /* [done] find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* [done] START LOOP: for each found tag link */
  for(let tagLink of tagLinks) {
    /* [done] add class active */
    tagLink.classList.add('active');
  /* [done] END LOOP: for each found tag link */
  }
  /* [done] execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  /* [done] find all links to tags */
  const allTagsLinks = document.querySelectorAll('a[href^="#tag-"]');

  /* [done] START LOOP: for each link */
  for(let allTagLink of allTagsLinks) {
    /* [done] add tagClickHandler as event listener for that link */
    allTagLink.addEventListener('click', tagClickHandler);
  /* [done] END LOOP: for each link */
  }
}
addClickListenersToTags();

//[in progress] Add authors to articles

function generateAuthors() {
  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles);

  /* [DONE] START LOOP: for every article: */
  for (let article of articles) {

    /* [DONE] find authors wrapper */
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    console.log(authorWrapper);

    /* [DONE] make html variable with empty string */
    let html = '';

    /* [DONE] get tags from data-author attribute */
    const articleAuthor = article.getAttribute('data-author');
    console.log(articleAuthor);

    /* [DONE] generate HTML of the link */
    const linkHTML = '<li><a href="#author-' + articleAuthor + '"><span>' + articleAuthor + '</span></a></li>';

    html = linkHTML;

    authorWrapper.innerHTML = html;
  }
}

generateAuthors();

//authorClickHandler - the function is the same as tagClickHandler function

function authorClickHandler(event) {

  event.preventDefault();

  const clickedElement = this;

  /* [done] make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* [done] make a new constant "author" and extract tag from the "href" constant */
  const author = href.replace('#author-' ,'');
  console.log(author);

  /* [done] find all author links with class active */
  const authorActiveLinks = document.querySelectorAll('a.active[href^="#author-"]');

  /* [done] START LOOP: for each active author link */
  for (let authorActiveLink of authorActiveLinks) {
    authorActiveLink.classList.remove('active');
  }

  /* [done] find all author links with "href" attribute equal to the "href" constant */
  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* [done] START LOOP: for each found author link */
  for (let authorLink of authorLinks) {
    authorLink.classList.add('active');
  }

  /* [done] execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');

}

function addClickListenersToAuthors() {

  /* [done] find all links to author */
  const allAuthorLinks = document.querySelectorAll('a[href^="#author-"]');

  /* [done] START LOOP: for each link */
  for (let allAuhorLink of allAuthorLinks ) {
    /* [done] add tagClickHandler as event listener for that link */
    allAuhorLink.addEventListener('click', authorClickHandler);
    /* [done] END LOOP: for each link */
  }
}

addClickListenersToAuthors();
