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
    clickedElement.classList.add('active')
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

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleLinks(){

    /* [done] remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);

    /* [done] for each article */
    const articles = document.querySelectorAll(optArticleSelector);

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