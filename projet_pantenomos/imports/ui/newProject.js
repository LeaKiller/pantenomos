//importation des méthodes
import { Projects } from '../api/db_projects.js';

//ajout futur: ajout de notes de bas de page et mise en forme de base en Markup Language.

//initialise la variable amendementCount
let amendementCount;

Template.newProject.onRendered(function () {
    amendementCount = 0;
});

//création d'un projet
Template.newProject.events({

    'submit #formNewProject': function(event, template){

        event.preventDefault();

        let project = {title: '', summary: '', amendements: []};

        project.summary = document.getElementById("projectSummary").value;
        project.title = document.getElementById("projectTitle").value;

        let amendements = document.getElementsByClassName("amendement");

        Array.from(amendements).forEach((amendement) => {
            
            let newAmendement = {title: document.getElementById("am_" + amendement.id + "_title").value, articles: []};
            let articles = document.getElementsByClassName("article " + amendement.id);

            Array.from(articles).forEach((article) => {

                let newPoints = [];

                Array.from(document.getElementById(article.id + "_text").value.split('\n')).forEach((point) => {

                    if (point != "") {
                        newPoints.push({content: point, score: 0});
                    }
                });                

                let newArticle = {title: document.getElementById(article.id + "_title").value, points: newPoints};
                newAmendement.articles.push({article: newArticle});

            });

            project.amendements.push({amendement: newAmendement});
        });

        //insert un projet dans la collection
        Meteor.call('projects.create', project);

        //vide le formulaire
        document.getElementById("projectTitle").value = '';

        var topNode = document.getElementById("lawText");

        while (topNode.firstChild) {
            topNode.removeChild(topNode.firstChild);
        }

        setTimeout(function(){
            FlowRouter.go('homePage');
        }, 250);
    },

    //création de nouveaux amendements
    'click #addAmendement': function(event){

        event.preventDefault();
        amendementCount++;

        let newAmendement = document.createElement("div");

        newAmendement.className = "amendement";        
        newAmendement.id = amendementCount;

        let newAmendementTitle = document.createElement("input");

        newAmendementTitle.id = "am_" + amendementCount + "_title";
        newAmendementTitle.type = "text";
        newAmendementTitle.size = 90;
        newAmendementTitle.value = amendementCount + ". ";

        newAmendement.appendChild(newAmendementTitle);
        newAmendement.appendChild(document.createElement("br"));

        let newAddArticle = document.createElement("input");

        newAddArticle.type = "button";
        newAddArticle.value = "+";

        newAmendement.appendChild(newAddArticle);
        newAmendement.appendChild(document.createElement("br"));

        let articleCount = 0;

        //création de nouveaux articles
        newAddArticle.addEventListener("click", function() {

            articleCount++;;

            let newArticle = document.createElement("div");

            newArticle.className = "article " + amendementCount;
            newArticle.id = "am_" + newAmendement.id + "_art_" + articleCount

            let newArticleTitle = document.createElement("input");

            newArticleTitle.className = "articleTitle";
            newArticleTitle.id = newArticle.id + "_title";

            newArticleTitle.type = "text";
            newArticleTitle.size = 90;
            newArticleTitle.value = "Art. " + articleCount;

            newArticle.appendChild(newArticleTitle);
            newArticle.appendChild(document.createElement("br"));

            let newArticleTextArea = document.createElement("textarea");

            newArticleTextArea.id = newArticle.id + "_text";
            newArticleTextArea.className = "articleTextArea";

            newArticleTextArea.rows = 10;
            newArticleTextArea.cols = 100;

            newArticle.appendChild(newArticleTextArea);
            newArticle.appendChild(document.createElement("br"));

            let removeArticle = document.createElement("input");

            removeArticle.type = "button";
            removeArticle.value = "-";

            //possibilité de supprimer les nouveaux articles
            removeArticle.addEventListener("click", function() {
                articleCount--;
                newAmendement.removeChild(newArticle);

            });

            newAmendement.removeChild(newAddArticle);
            newAmendement.appendChild(newArticle);
            newAmendement.appendChild(newAddArticle);
            newArticle.appendChild(removeArticle);
            newAmendement.appendChild(document.createElement("br"));

        });

        document.getElementById("lawText").appendChild(newAmendement);
        document.getElementById("lawText").appendChild(document.createElement("br"));
    }
});