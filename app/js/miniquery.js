/*!
 * minQuery
 */

 var SweetSelector = (function() {
  return {
    select: function(selector){
      var id_regex = /#[A-z]+/;
      var class_regex = /\.[A-z]+/;
      if (selector.match(id_regex)){
        var idElement = selector.slice(1, selector.length);
        return document.getElementById(idElement);
      } else if (selector.match(class_regex)) {
        var classElement = selector.slice(1, selector.length);
        return document.getElementsByClassName(classElement);
      } else {
        return document.getElementsByTagName(selector);
      }
    }
  }
}) ();


 var DOM = (function() {
  return {
    hide: function(selector){
      var elementClass = SweetSelector.select(selector);
      var arrayOfClassElements = Array.from(elementClass);
      arrayOfClassElements.forEach(function(element){
       return element.style.display = "none";
     });
    },
    show: function(selector){
      var elementClass = SweetSelector.select(selector);
      var arrayOfClassElements = Array.from(elementClass);
      arrayOfClassElements.forEach(function(element){
       return element.style.display = "block";
     });
    },
    addClass: function(selector, newClass){
      var elementClass = SweetSelector.select(selector);
      var arrayOfClassElements = Array.from(elementClass);
      arrayOfClassElements.forEach(function(element){
        return element.className += ' ' + newClass;
      });
    },
    removeClass: function(selector, newClass){
      var elementClass = SweetSelector.select(selector);
      var arrayOfClassElements = Array.from(elementClass);
      arrayOfClassElements.forEach(function(element){
        return element.classList.remove(newClass);
      });
    }
  }
}) ();


 var EventDispatcher = (function() {
  return {
    on: function(selector, eventName, callback){
      var elementClass = SweetSelector.select(selector);
      var arrayOfClassElements = Array.from(elementClass);
      arrayOfClassElements.forEach(function(element){
        return element.addEventListener(eventName, callback, false);
      });
    },
    trigger: function(selector, eventName){
      var elementClass = SweetSelector.select(selector);
      var event = new Event(eventName);
      var arrayOfClassElements = Array.from(elementClass);
      arrayOfClassElements.forEach(function(element){
        return element.dispatchEvent(event);
      });
    }
  }
}) ();

 var AjaxWrapper = (function(){
  return {
    request: function(args){
      var type = args.type;
      var url = args.url;
      var promise = new Promise(function(resolve, reject){
        var req = new XMLHttpRequest();
        req.open(type, url, true);
        req.onload = function() {
          if (this.status >= 200 && this.status <= 300 ) {
            resolve(this.response);
          } else {
            reject(this.statusText);
          }
        };
        req.onerror = function() {
          reject(this.statusText);
        };
        req.send();
      });
      return promise;
    }
  }
}) ();

var AppendElement = (function () {
  return {
    append: function(selector, template)  {
      var element = SweetSelector.select(selector);
      element.innerHTML += template;
    }
  }
}) ();

var miniQuery = function(selector) {
  var domElement = SweetSelector.select(selector);
  domElement.hide = function() {
    DOM.hide(selector)
  };
  domElement.show = function() {
    DOM.show(selector)
  };
  domElement.addClass = function(newClass) {
    DOM.addClass(selector, newClass)
  };
  domElement.removeClass = function(newClass) {
    DOM.removeClass(selector, newClass)
  };
  domElement.on = function(eventName, callback) {
    EventDispatcher.on(selector, eventName, callback)
  };
  domElement.trigger = function(eventName) {
    EventDispatcher.trigger(selector, eventName)
  };
  domElement.append = function(template) {
    AppendElement.append(selector, template);
  };
  return domElement
};


miniQuery.ajax = function(args) {
  return AjaxWrapper.request(args);
}

miniQuery.ready = function(callback){
  document.addEventListener("DOMContentLoaded", function(event) {
    callback();
  });
}

var $ = Object.assign({}, miniQuery);
