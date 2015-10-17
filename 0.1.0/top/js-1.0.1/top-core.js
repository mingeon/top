Top = Ember.Object.extend({
	version : "License 1.0.1",
	license : "GPL"
});

Top.reopenClass({
	configs : Object,
	activeWidgets : null,
	appLoadEvents : [],
	appEvents : null,
	routes : null,
	pages : null,
	curPage : null,
	attachCallback : [],
	detachCallback : [],
	routeActCallback : Function,
	routeDeactCallback : Function,
	curRoute : Object,
	
	init : function() {
		this.activeWidgets = Top.Util.HashMap.create();
		this.appEvents = Top.Util.HashMap.create();
		this.routes = Top.Util.HashMap.create();
		this.pages = Top.Util.HashMap.create();
		this.curPage = Top.BaseWidget.Page;
		this.routeActCallback = function() {return true};
		this.routeDeactCallback = function() {return true};
	}
});

Top.Util= Ember.Object.extend({
	//type : data
});

Top.Util.reopenClass({
	guid : function() {
		return 'zxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
			return v.toString(16);
		});
	}
});



Top.Util.HashMap = Top.Util.extend({
	map : Object,
	input: null,

	init : function(){
		if(this.input) {
			this.map = new Object(this.input);
		} else {
			this.map = new Object();
		}
	},
	
	put: function (key, value) {
        this.map[key] = value;
    },

    getValue: function (key) {
        return this.map[key];
    },
   	
	getKeys: function (value) {
		var arKey = new Array();
        for (var prop in this.map) {
            if (this.map[prop] == value) {
				arKey.push(prop);
            }
        }
        return arKey;
    },
	 
    containsKey: function (key) {
        return key in this.map;
    },
 
    containsValue: function (value) {
        for (var prop in this.map) {
            if (this.map[prop] == value) {
                return true;
            }
        }
        return false;
    },
 
    clear: function () {
        for (var prop in this.map) {
            delete this.map[prop];
        }
    },
 
    remove: function (key) {
        delete this.map[key];
    },
 
    keys: function () {
        var arKey = new Array();
        for (var prop in this.map) {
            arKey.push(prop);
        }
        return arKey;
    },
 
    values: function () {
        var arVal = new Array();
        for (var prop in this.map) {
            arVal.push(this.map[prop]);
        }
        return arVal;
    },
 
    size: function () {
        var count = 0;
        for (var prop in this.map) {
            count++;
        }
        return count;
    }
});

Top.BaseWidget = Ember.Object.extend({
	template : TopWidgetBehavior,  
    is : "top-widget",
    id : String,
    
   
   createWidget : function(type, properties){
   		var createdWidget = Object;
		var emberProperties = {};
		//properties.hasOwnProperty
		
		if (properties != null) {
			if (properties.hasOwnProperty("id") == true) 
				emberProperties["id"] = properties["id"];
			
			if (properties.hasOwnProperty("template") == true) 
				emberProperties["template"] = properties["template"];
		}
		
		
		switch(type){
			case 'button' : 
				createdWidget = Top.BaseWidget.Button.create(emberProperties);	
				break;
			case 'checkbox' : 
				createdWidget = Top.BaseWidget.Checkbox.create(emberProperties);
				break;
			case 'textfield' : 
				createdWidget = Top.BaseWidget.Textfield.create(emberProperties);
				break;
			case 'textarea' : 
				createdWidget = Top.BaseWidget.Textarea.create(emberProperties);
				break;
			case 'imageview' : 
				createdWidget = Top.BaseWidget.Imageview.create(emberProperties);
				break;
			case 'progressbar' : 
				createdWidget = Top.BaseWidget.Progressbar.create(emberProperties);
				break;	
			case 'radiobutton' : 
				createdWidget = Top.BaseWidget.Radiobutton.create(emberProperties);
				break;
			case 'slider' : 
				createdWidget = Top.BaseWidget.Slider.create(emberProperties);
				break;
			case 'textview' : 
				createdWidget = Top.BaseWidget.Textview.create(emberProperties);
				break;
			case 'videoview' : 
				createdWidget = Top.BaseWidget.Videoview.create(emberProperties);
				break;
			case 'imagebutton' : 
				createdWidget = Top.BaseWidget.Imagebutton.create(emberProperties);
				break;
			case 'webview' : 
				createdWidget = Top.BaseWidget.Webview.create(emberProperties);
				break;
			case 'switch' : 
				createdWidget = Top.BaseWidget.Switch.create(emberProperties);	
				break;
			case 'toggle' : 
				createdWidget = Top.BaseWidget.Toggle.create(emberProperties);	
				break;	
			case 'datepicker' : 
				createdWidget = Top.BaseWidget.Datepicker.create(emberProperties);	
				break;
			case 'absolutelayout' : 
				createdWidget = Top.BaseWidget.Layout.Absolutelayout.create(emberProperties);
				break;
			case 'linearlayout' : 
				createdWidget = Top.BaseWidget.Layout.Linearlayout.create(emberProperties);
				break;
			case 'framelayout' : 
				createdWidget = Top.BaseWidget.Layout.Framelayout.create(emberProperties);
				break;									
			case 'docklayout' : 
				createdWidget = Top.BaseWidget.Layout.Docklayout.create(emberProperties);
				break;
			case 'gridlayout' : 
				createdWidget = Top.BaseWidget.Layout.Gridlayout.create(emberProperties);
				break;
			case 'tablayout' : 
				createdWidget = Top.BaseWidget.Layout.Tablayout.create(emberProperties);
				break;
			case 'accordionlayout' : 
				createdWidget = Top.BaseWidget.Layout.Accordionlayout.create(emberProperties);
				break;	
			case 'rowlayout' : 
				createdWidget = Top.BaseWidget.Layout.Rowlayout.create(emberProperties);
				break;
			case 'form' : 
				createdWidget = Top.BaseWidget.Layout.Form.create(emberProperties);
				break;					
			case 'listview' : 
				createdWidget = Top.BaseWidget.Container.Listview.create(emberProperties);
				break;
			case 'tableview' : 
				createdWidget = Top.BaseWidget.Container.Tableview.create(emberProperties);
				break;
			case 'panel' : 
				createdWidget = Top.BaseWidget.Container.Panel.create(emberProperties);
				break;
			case 'imageslider' : 
				createdWidget = Top.BaseWidget.Group.Imageslider.create(emberProperties);
				break;
			case 'selectbox' : 
				createdWidget = Top.BaseWidget.Group.Selectbox.create(emberProperties);
				break;
			case 'treeview' : 
				createdWidget = Top.BaseWidget.Group.Treeview.create(emberProperties);
				break;			
			case 'widgetitem' : 
				createdWidget = Top.BaseWidget.Group.Widgetitem.create(emberProperties);
				break;
			case 'menuitem' : 
				createdWidget = Top.BaseWidget.Menu.Menuitem.create(emberProperties);
				break;	
			case 'drawermenu' : 
				createdWidget = Top.BaseWidget.Menu.Drawermenu.create(emberProperties);
				break;
			case 'contextmenu' : 
				createdWidget = Top.BaseWidget.Menu.Contextmenu.create(emberProperties);
				break;	
			case 'page' : 
				createdWidget = Top.BaseWidget.Page.create(emberProperties);
				break;
			case 'pagination' : 
				createdWidget = Top.BaseWidget.Pagination.create(emberProperties);
				break;
			case 'alarmbadge' : 
				createdWidget = Top.BaseWidget.Alarmbadge.create(emberProperties);
				break;
			case 'notification' : 
				createdWidget = Top.BaseWidget.Notification.create(emberProperties);
				break;
			case 'chart' : 
				createdWidget = Top.BaseWidget.Chart.create(emberProperties);
				break;				
			default : 
				console.log("Type Error :  Not defined ");
				break;				
										
		};
		
		

		//properties.id = createdWidget.id;
		
		
		
		if (properties != null) {
		    //propertiesCopy = properties;
			
			if(properties.hasOwnProperty('template') == true)
			delete properties["template"];
			
			createdWidget.setProperties(properties);
				
		};	
		
		return createdWidget;
   },	
   
   deleteWidget: function(){
   		  for (var key in this){
		  	this[key] = null; 
		  };
		  this.__proto__  = null;
   },
			
   setProperties : function(properties_arg){
   		var propertiesKeys = Object.keys(properties_arg);
   	 
		
		for(var i=0; i<propertiesKeys.length; i++){
			
			
			var arg_key = propertiesKeys[i];
			var arg_value = properties_arg[arg_key];
			
			
			
			
			if (arg_key == "class") {
				this.template.setAttribute("class", arg_value);
			}else if (arg_key == "orientation") {
				this.template.setAttribute("orientation", arg_value);
			}else if(arg_key=="widgets"){
				
				for (var j = 0; j < arg_value.length; j++) {
					this.template.childs.push(arg_value[j].template);
				};
			}else{
				this.template.set(arg_key, arg_value);		
			}
		};
		this.template.updateStyle(propertiesKeys);
		this.template.updateValue();
	
	
   	
   },
   
   setChecked : function(checked){
   		this.template.set("checked", checked);
		this.template.updateValue();
	
   },
   
   setText : function(text){
   		this.template.set("text", text);
		this.template.updateValue();
		
   },
   
   setDisabled : function(disabled){
   		this.template.set("disabled", disabled);
		this.template.updateValue();
   },
   
   setVisible : function(visible){ // none, inherit, hidden, visible
   		this.template.set("visible", visible);
		this.template.updateStyle();
   },
   
   setSrc : function(src){
   		this.template.set("src", src);
		this.template.upateValue();
		
   },
   
    setHref : function(href){
   		this.template.set("href", href);
		this.template.upateValue();
		
   },
  
   
   getProperties : function(key){
   		return this.template[key];
   },
   
   getChecked : function(checked){
   		return this.template["checked"];
   },
   
   
   getText : function(){
   		return this.template["text"];
		
   },
   
   getValue : function(){
   		return this.template["value"];
   },
   
   getDisabled : function(){
   		return this.template["disabled"];
   },
   
   getSrc : function(){
   		return this.template["src"];
		
   },
   
   getHref : function(){
   		return this.template["href"];
		
   },
   
   getIndex : function() {
	   return this.template["index"];
   },
   
   getPosition : function() {
	   return this.template["position"];
   },
   
   onEvent : function(type, functionObj){
   		switch(type){
			case 'mouseClick' : 
				this.template.set("eventMouseClick", functionObj);
				break;
			case 'mouseEnter' :
			 	this.template.set("eventMouseEnter", functionObj);
				break;
			case 'mouseExit' :
			 	this.template.set("eventMouseExit", functionObj);
				break;
			case 'mouseMove' :
			 	this.template.set("eventMouseMove", functionObj);
				break;
			case 'mousePressed' :
			 	this.template.set("eventMousePressed", functionObj);
				break;
			case 'mouseReleased' :
				this.template.set("eventMouseReleased", functionObj);
				break;
			case 'keyPressed' :
			 	this.template.set("eventKeyPressed", functionObj);
				break;
			case 'keyReleased' :
			 	this.template.set("eventKeyReleased", functionObj);
				break;
			case 'keyTyped' :
			 	this.template.set("eventKeyTyped", functionObj);
				break;
			case 'focused' :
			 	this.template.set("eventFocused", functionObj);
				break;
			case 'lostFocused' :
			 	this.template.set("eventLostFocused", functionObj);
				break;
			case 'changed' :
			 	this.template.set("eventChanged", functionObj);
				break;	
			default : 
				console.log("Type Error :  Not defined ");
				break;							
		};		
   },
   
      
   offEvent : function(type, functionObj, destroy){
   		var eventType = "event"+type.substring(0,1).toUpperCase() + type.substring(1);
   	
		if(this[eventType] == functionObj){
			this.template.set(eventType, null);
		};
		
		if (destroy === true) {
			functionObj = function(){
				null;
			};
			delete functionObj;
		}
		
	},
	bindData : function(model){
			
			var modelJSON = JSON.parse(model);
			var widgetJSON = modelJSON;
			
			this.template.set("dataModel", JSON.stringify(modelJSON));
			this.template.updateStyle();
			
	
	},
	
	unbindData : function(attribute){
		
		var bindMap = this.template.dataVariable[attribute].bindWidget;
			
		
		for(var i=0; i<bindMap.length; i++){
			if(bindMap[i][1].id == this.template.id && bindMap[i][2] == attribute)
				bindMap.splice(i,1);
				
			
		};
		
		
		
		delete this.template.dataVariable[attribute];
		delete this.template.dataField[attribute];
		
	
	}
	

	

});

Top.Widget = Top.BaseWidget.create();

Top.BaseWidget.Button = Top.BaseWidget.extend({
	template : null,
	is : "top-button",
	init : function(){
		if(this.template == null){
			this.template = new TopButton();	
		}
	} 
});



Top.BaseWidget.Checkbox = Top.BaseWidget.extend({
	template : null,
	is : "top-checkbox",
	init : function(){		
		if(this.template == null){
			this.template = new TopCheckbox();	
		}
	}
});

Top.BaseWidget.Textfield = Top.BaseWidget.extend({
	template : null,
	is : "top-textfield",
	init : function(){		
		if(this.template == null){
			this.template = new TopTextfield();	
		}
	}
});

Top.BaseWidget.Textarea = Top.BaseWidget.extend({
	template : null,
	is : "top-textarea",
	init : function(){		
		if(this.template == null){
			this.template = new TopTextarea();	
		}
	}
});



Top.BaseWidget.Imageview = Top.BaseWidget.extend({
	template : null,
	is : "top-imageview",
	init : function(){
		if(this.template == null){
			this.template = new TopImageview();
		}
	}
});

Top.BaseWidget.Progressbar = Top.BaseWidget.extend({
	template : null,
	is : "top-progressbar",
	init : function(){		
		if(this.template == null){
			this.template = new TopProgressbar();
		}
	}
});

Top.BaseWidget.Radiobutton = Top.BaseWidget.extend({
	template : null,
	is : "top-radiobutton",
	init : function(){
		if(this.template == null){
			this.template = new TopRadiobutton();
		}
	}
});

Top.BaseWidget.Slider = Top.BaseWidget.extend({
	template : null,
	is : "top-slider",
	init : function(){
		if(this.template == null){
			this.template = new TopSlider();
		}
	}
});
				
Top.BaseWidget.Textview = Top.BaseWidget.extend({
	template : null,
	is : "top-textview",
	init : function(){		
		if(this.template == null){
			this.template = new TopTextview();
		}
	}
});

Top.BaseWidget.Videoview = Top.BaseWidget.extend({
	template : null,
	is : "top-videoview",
	init : function(){
		if(this.template == null){
			this.template = new TopVideoview();
		}
	},
	
	getPlayState : function(){
		return this.template.getPlayStae();
		
	},
	play : function(){
		this.template.play();
		
	},
	stop : function(){
		this.template.stop();
	}
});

Top.BaseWidget.Imagebutton = Top.BaseWidget.extend({
	template : null,
	is : "top-imagebutton",
	init : function(){
		if(this.template == null){
			this.template = new TopImagebutton();
		}
	}
});

Top.BaseWidget.Webview = Top.BaseWidget.extend({
	template : null,
	is : "top-webview",
	init : function(){		
		if(this.template == null){
			this.template = new TopWebview();
		}
	}
});

Top.BaseWidget.Switch = Top.BaseWidget.extend({
	template : null,
	is : "top-switch",
	init : function(){		
		if(this.template == null){
			this.template = new TopSwitch();
		}
	},
	toggleOn : function(){
		this.template.toggleOn();
	},
	
	toggleOff: function(){
		this.template.toggleOff();
	},
	
	getToggleState : function(){
		return this.template["value"];
	}
});

Top.BaseWidget.Toggle = Top.BaseWidget.extend({
	template : null,
	is : "top-toggle",
	init : function(){
		if(this.template == null){
			this.template = new TopToggle();
		}
	},
	
	toggleOn : function(){
		this.template.toggleOn();
	},
	
	toggleOff : function(){
		this.template.toggleOff();
	},
	
	getToggleState : function(){
		return this.template["value"];
		
	}
});



Top.BaseWidget.Datepicker = Top.BaseWidget.extend({
	template : null,
	is : "top-datepicker",
	init : function(){
		if(this.template == null){
			this.template = new TopDatepicker();
		}
	},
	
	getDate : function(){
		return this.template["date"];
		
	},
	
	setDate : function(date){
		this.template.set("date", date);
		this.template.upateValue();
	}
});


Top.BaseWidget.Layout = Top.BaseWidget.extend({
	template : TopLayoutBehavior,
	is : "top-layout",

	append : function(htmlString) {
		$("#" + this.id).append(htmlString);
	},
	
	html : function(htmlString) {
		$("#" + this.id).html(htmlString);
	},
	
	src : function(filePath, callback) {
		var id = this.id;
		Top.Ajax.get(filePath, "", "", function(data, textStatus, jqXHR) {
			$("#" + id).append(data);
			if(callback) callback();
		}, "");
	},
	
	addWidget : function(widget){
		this.template.childs.push(widget.template);
	},
	
	removeWidget : function(widget){			
		var childsArray = this.template.childs;
		
		for (var i = 0; i < childsArray.length; i++) {
			if (widget.id == childsArray[i].id) {
				this.template.childs.splice(i, 1);
			};
			
		};
	},
	
	getChildren : function() {
		return this.template.childs;
	},
	
	hasChild : function(child) {
		if(typeof child == 'string') {
			var childId = child;
		} else {
			var childId = child.id;
		}
		var len = this.template.childs.length;
		for(var i = 0; i < len; i++) {
			if(childId == this.template.childs[i].id) {
				return true;
			}
		}
		return false;		
	},
	
	clear : function() {
		this.template.childs.splice(0, this.template.childs.length);
		this.complete();
    },
   
	complete: function(){
		this.template.renderLayout();
	}
});

Top.BaseWidget.Layout.Absolutelayout = Top.BaseWidget.Layout.extend({
	is : "top-absolutelayout",
	template : null,
	init : function(){		
		if(this.template == null){
			this.template = new TopAbsolutelayout();
		}
	}

});

Top.BaseWidget.Layout.Linearlayout =  Top.BaseWidget.Layout.extend({
	is : "top-linearlayout",
	template : null,
	init: function(){		
		if(this.template == null){
			this.template = new TopLinearlayout();
		}
	}

});

Top.BaseWidget.Layout.Framelayout =  Top.BaseWidget.Layout.extend({
	is : "top-framelayout",
	template : null,
	init : function(){		
		if(this.template == null){
			this.template = new TopFramelayout();
		}
	}
});


Top.BaseWidget.Layout.Tablayout = Top.BaseWidget.Layout.extend({
	template : null,
	init : function(){		
		if(this.template == null){
			this.template = new TopTablayout();
		}
	},
	
	is : "top-tablayout"
});

Top.BaseWidget.Layout.Accordionlayout = Top.BaseWidget.Layout.extend({
	template : null,
	init : function(){		
		if(this.template == null){
			this.template = new TopAccordionlayout();
		}
	},
	
	is : "top-accordionlayout"
});




Top.BaseWidget.Layout.Docklayout = Top.BaseWidget.Layout.extend({
	template : null,
	is : "top-docklayout",
	init : function(){		
		if(this.template == null){
			this.template = new TopDocklayout();
		}
	}
});

Top.BaseWidget.Layout.Gridlayout = Top.BaseWidget.Layout.extend({
	template : null,
	is : "top-gridlayout",
	init : function(){
		if(this.template == null){
			this.template = new TopGridlayout();
		}
	}
});



Top.BaseWidget.Layout.Rowlayout = Top.BaseWidget.Layout.extend({
	template : null,
	is : "top-rowlayout",
	init : function(){		
		if(this.template == null){
			this.template = new TopRowlayout();
		}
	}
	
});

Top.BaseWidget.Layout.Form = Top.BaseWidget.Layout.extend({
	template : null,
	init : function(){		
		if(this.template == null){
			this.template = new TopForm();
		}
	},
	
	is : "top-form"
});




Top.BaseWidget.Group = Top.BaseWidget.extend({	
	is : "top-groupbehavior",
	template : TopGroupBehavior,
	init : function(){
		
	},

	addItem: function(widget){
		this.template.items.push(widget.template);
	},
	
	removeItem : function(widget){
		var childsArray = this.template.items;
		
		for (var i = 0; i < childsArray.length; i++) {
			if (widget.id == childsArray[i].id) {
				this.template.items.splice(i, 1);
			};
			
		};
		
	},
	complete: function(){
		this.template.updateValue();
	}
	
	
	
});

Top.BaseWidget.Group.Widgetitem = Top.BaseWidget.extend({	
	is : "top-widgetitem",
	template : null,
	
	init : function(){		
		if(this.template == null){
			this.template = new TopWidgetitem();
		}
	},
	
	
	addItem: function(widget){
		this.template.subItems.push(widget.template);
	},
	
	removeItem : function(widget){
		var childsArray = this.template.subItems;
		
		for (var i = 0; i < childsArray.length; i++) {
			if (widget.id == childsArray[i].id) {
				this.template.childs.splice(i, 1);
			};
			
		};
		
	},
	complete: function(){
		
		this.template.updateSubItem();
	}
	
});



Top.BaseWidget.Group.Imageslider = Top.BaseWidget.Group.extend({	
	is : "top-imageslider",
	template : null,
	
	init : function(){
		if(this.template == null){
			this.template = new TopImageslider();
		}
	},
	
	goToSlide : function(index){
		this.template.goToSlide(index);
		
	},
	
	goToNextSlide : function(){
		this.template.goToNextSlide();
	},
	
	goToPrevSlide : function(){
		this.template.goToPrevSlide();
	},
	
	startAuto : function(){
		this.template.startAuto(index);
	},
	
	stopAuto : function(){
		this.template.stopAuto(index);
	},
	
	getCurrentSlide : function(){
		 return this.template.getCurrentSlide();
	}

});

Top.BaseWidget.Group.Selectbox = Top.BaseWidget.Group.extend({	
	is : "top-selectbox",
	template : null,
	
	init : function(){
		if(this.template == null){
			this.template = new TopSelectbox();
		}
	},
	
	
	
});


Top.BaseWidget.Group.Treeview = Top.BaseWidget.Group.extend({	
	is : "top-treeview",
	template : null,
	
	init : function(){
		if(this.template == null){
			this.template = new TopTreeview();
		}
	},
	
	openAll : function(){
		this.template.openAll();
	},
	
	closeAll : function(){
		this.template.closeAll();
	}
});

Top.BaseWidget.Container = Top.BaseWidget.extend({	
	complete: function() {
		this.template.renderLayout();
	},
	
	setItems : function(items) {
		this.template.set('items', items);
	}
});

Top.BaseWidget.Container.Listview = Top.BaseWidget.Container.extend({
	template : null,
	init : function(){
		if(this.template == null){
			this.template = new TopListview();
		}
	},
	addLayout: function(layout){
	
		this.template.itemLayout =	$(layout.template).wrap('<p/>').parent().html();
		$(layout.template).unwrap();
	},
	
	is : "top-listview"
});

Top.BaseWidget.Container.Tableview = Top.BaseWidget.Container.extend({
	template : null,
	init : function(){
		if(this.template == null){
			this.template = new TopTableview();
		}
	},
	is : "top-tableview",
	
	addLayout: function(layout){
		this.template.itemLayoutChilds = layout.template.childs;	
	},
	
	page : function(target){ // next previous first last integer
		this.template.page(target);
		
	}, 
	
	pageLen : function(length){ // -1 or integer
		this.template.pageLen(length);
	},
	
	sort : function(category){ // [[0,'asc'],[1,'desc']]
		this.template.dataSort(category);
		
	}
});

Top.BaseWidget.Container.Panel = Top.BaseWidget.Container.extend({
	template : null,
	init : function(){		
		if(this.template == null){
			this.template = new TopTableview();
		}
	},
	is : "top-tableview",
	
	setContent: function(layout){
	
		this.template.itemLayout =	$(layout.template).wrap('<p/>').parent().html();
		$(layout.template).unwrap();
		this.template.setContent(this.template.itemLayout);
		

	},
	
	setTitle : function(title){
		
		this.template.title = title;
		this.template.setTitle(title);
	},
	
	
	setIcons: function(icons){
	
		this.template.icons = icons;
		this.template.setIcons(icons);
		
	}
	
});

Top.BaseWidget.Menu  = Top.BaseWidget.extend({
	template : TopMenuBehavior,
	is : "top-menu",
	addMenu : function(widget){
		this.template.menuItems.push(widget.template);
	},
	removeMenu : function(widget, destroy){
		var child_len = this.template.menuItems.length;
		
		for(var i=0; i<child_len; i++){
			if (this.template.menuItems[i].id == widget.id) {
				this.template.menuItems.splice(i, 1);
				break;
			};
		};	
	},
	complete: function(){
		var divTest = document.getElementsByTagName("body");
		divTest[0].appendChild(this.template);
		this.template.renderMenu();
	}
	
});

Top.BaseWidget.Menu.Menuitem = Top.BaseWidget.Menu.extend({
	template : null,
	is : "top-menuitem",
	init : function(){
		if(this.template == null){
			this.template = new TopMenuitem();
		}
	},
	addMenu : function(widget){
		this.template.subMenuItems.push(widget.template);
	},
	removeMenu : function(widget, destroy){
		var child_len = this.template.subMenuItems.length;
		
		for(var i=0; i<child_len; i++){
			if (this.template.subMenuItems[i].id == widget.id) {
				this.template.subMenuItems.splice(i, 1);
				break;
			};
		};	
	},
	complete: function(){	
		this.template.updateSubMenu();
		
	}	
});


Top.BaseWidget.Menu.Drawermenu = Top.BaseWidget.Menu.extend({
	template : null,
	is : "top-drawermenu",
	init : function(){
		if(this.template == null){
			this.template = new TopDrawermenu();
		}
	},
	
	open : function() {
		this.template.open();
	},
	
	close : function() {
		this.template.close();
	},
	
	toggle : function() {
		this.template.toggle();
	}
});



Top.BaseWidget.Menu.Contextmenu = Top.BaseWidget.Menu.extend({
	template : null,
	is : "top-contextmenu",
	init : function(){
		if(this.template == null){
			this.template = new TopContextmenu();
		}
	}
});




Top.BaseWidget.Page = Top.BaseWidget.extend({
	template : null,
	loaded : false,
	activated : false,
	init : function(){
		if(this.template == null){
			this.template = new TopPage();	
		}
		this.template.set("visible", "none");
	},
	
	append : function(htmlString) {
		$("#" + this.id).append(htmlString);
	},
	
	html : function(htmlString) {
		$("#" + this.id).html(htmlString);
	},
	
	onLoad : function(func) {
		this.template["onLoad"] = func;
	},
	
	onBeforeActivate : function(func) {
		var page = this;
		this.template["onBeforeActivate"] = function() {
			func(page.template.params);
		};
	},
	
	onActivate : function(func) {
		var page = this;
		this.template["onActivate"] = function() {
            if(location.hash) {
				var path = location.hash.replace('#!', '');
				Top.App.routeTo(path);
			}
			func(page.template.params);
        };
	},
	
	onDeactivate : function(func) {
		this.template["onDeactivate"] = func;
	}
});

Top.BaseWidget.Pagination = Top.BaseWidget.extend({
	template : null,
	init : function(){		
		if(this.template == null){
			this.template = new TopPagination();
		};
	}
});

Top.BaseWidget.Alarmbadge = Top.BaseWidget.extend({
	template : null,
	init : function(){
		if(this.template == null){
			this.template = new TopAlarmbadge();
		}
	}	
});

Top.BaseWidget.Notification = Top.BaseWidget.extend({
	template : null,
	init : function(){
		if(this.template == null){
			this.template = new TopNotification();
		}
	},
	setTitle : function(title){
		this.template.setTitle(title);
		
	},
	setIcon : function(icon){
		this.template.setIcon(icon);
	},
	setType : function(type){
		this.template.setType(type);	
	},
	setUrl  :function(url){
	 	this.template.setUrl(url);
	},
	setTarget : function(target){
		this.template.setTarget(target);		
	}
		
});

Top.BaseWidget.Chart = Top.BaseWidget.extend({
	template : null,
	init : function(){
		if(this.template == null){
			this.template = new TopChart();
		}
	},
	
	setTitle : function(title){
		this.template.setTitle(title);
				
	},
	setSize : function(width ,height){
		this.template.setSize(width, height);
	},
	
	setType : function(type){
		this.template.setType(type);
	},
	
	setSeries :function(data){
		this.template.setSeries(data);
		
	},
	setOption : function(option){
		this.template.setOption(option);
	}
		
	
});

Top.Template = Ember.Object.extend({
	html : null,
	data : null,
	
	setData : function(data){
		this.data = data;
	},
	setHtml : function(html){
		this.html = html;
	},
	getRender : function(parent){
		var parse_result = $.templates(this.html).render(this.data);

		if(parent != null){
			$("#"+parent).append(parse_result);
			
		}else{
			return parse_result;
		}
	}
	
});





Top.Action = Top.extend({});

Top.Action.reopenClass({
	template : TopActionBehavior,
	
	styleChange: function(parameters){
		this.template.styleChange(parameters);
		
	},
	createWidget : function(parameters){
		this.template.createWidget(parameters);
	},
	
	showDialog : function(parameters){
		this.template.showDialog(parameters);
	},
	
	navigate : function(parameters){
		this.template.navigate(parameters);
	}
	
	
	
});


Top.Model = Ember.Object.extend({
		isValid : Object,
		data : Object,
		fields : Object,
		validation : [],
		bindWidget : [],
		init :function(){
			this["bindWidget"] =[];
			
			if(!this.data) return;
						
			 if(Array.isArray(this.data)) {
                this["isValid"] = new Array();
                var len = this.data.length;
                for(var i = 0; i < len; i++) {
                    this["isValid"][i] = {};
                    
                    var temp_keys = Object.keys(this.data[i]);
                    
                    for(var j = 0; j < this.fields.length; j++) {
                        // Checking null value on each of list item, if null, setting defaultvalue
                        if (this.data[i][this.fields[j]['name']] == null) {
                            if (this.fields[j].hasOwnProperty('defaultValue') != null) {
                                this.data[i][this.fields[j]['name']] = this.fields[j]['defaultValue'];
                            } else {
                                this.data[i][this.fields[j]['name']] = null;
                            }
                        }
                        var index = temp_keys.indexOf(this.fields[j]['name']);
                        
                        // Checking  JSON Key///////////////////////////////////////////////////////
                        if(index != -1)
                            temp_keys.splice(index, 1);
							
                        this.isValid[i][this.fields[j]['name']] = true;
                    }
                    
                    // Checking undefined fields 
                    if(temp_keys.length != 0) {
                        console.error(temp_keys + " is not defined fields");
                        for(var e; e < temp_keys.length; e++) {
                            delete this.data[i][temp_keys[e]];
                        }
                    }
                    
                  
                }
            } else {
              
                this["isValid"] = {};
                var temp_keys = Object.keys(this.data);
                for(var i = 0; i < this.fields.length; i++) {
                    if (this.data[this.fields[i]['name']] == null) {
                        if (this.fields[i].hasOwnProperty('defaultValue') != null) {
                            this.data[this.fields[i]['name']] = this.fields[i]['defaultValue'];
                        } else {
                            this.data[this.fields[i]['name']] = null;
                        }
                    }
                    var index = temp_keys.indexOf(this.fields[i]['name']);
					
                    if(index != -1)
                        temp_keys.splice(index, 1);
                    
					this.isValid[this.fields[i]['name']] = true;
                }
                
                // Checking undefined fields 
                if(temp_keys.length != 0) {
                    console.error(temp_keys + " is not defined fields");
                    for(var e; e < temp_keys.length; e++) {
                        delete this.data[temp_keys[e]];
                    }
                }
            }
		},
		
		isEuqals :  function(field1, field2){	
			    if (!field2)
			        return false;
			
			    if (field1.length != field2.length)
			        return false;
			
			    for (var i = 0, l=field1.length; i < l; i++) {
			        if (field1[i] != field2[i]) { 
				            return false;   
			        }           
			    }       
			    return true;
		},   
		
		setValue : function(field, value, widgetID){
				
				if(typeof field === "string"){
					field = field.split('.');
				}
				
				this.findField(field, value);
	
				var bindWidget_length = this.bindWidget.length;
		
					
				if( bindWidget_length != 0 ) {
					for (var i = 0; i < bindWidget_length; i++) {
						if(this.bindWidget[i][0] == "items" && widgetID == null){
							
							this.bindWidget[i][1].renderLayout();
							
							
						}else if(this.isEuqals(field, this.bindWidget[i][0])){		
								if(widgetID != null){
										if(this.bindWidget[i][1].id != widgetID )
												this.bindWidget[i][1].updateWidgetbyModel(this.bindWidget[i][2]);			
								}else{
									this.bindWidget[i][1].updateWidgetbyModel(this.bindWidget[i][2]);
								};

						}
						
					};
					
				}
			
			
		},
		
		findField: function(fields, value){
			var parts = fields
				parent = this.data,
				i=0;
			
			for(i=0; i<parts.length-1; i+=1){
				if(typeof parent[parts[i]] ==="undefined"){
					parent[parts[i]] ={};
				};
				parent = parent[parts[i]];
				
					
			};
			parent[parts[parts.length-1]] =value;		
		},	
	
		
		getValue : function(field){
			if(typeof field === "string"){
				field_array = field.split('.');
				
			}				
			var parts = field_array,
				parent = this.data,
				i=0;
			
			for(i=0; i<parts.length; i+=1){
				if(typeof parent[parts[i]] ==="undefined"){
					parent[parts[i]] ={};
				};
				parent = parent[parts[i]];
			};
			return parent;
		},
		
		setData : function(array) {
			this.data = array;
			this.updateWidget();
		},
		
		getData :function(index) {
			if(typeof index === "string") {
				return this.getValue(index);
			} else {
				return this.data[index];
			}
		},
		
		addData : function(obj) {
			this.data.push(obj);
			this.updateWidget();
		},
		
		mergeData : function(array) {
			var len = array.length;
			for(var i = 0; i < len; i++) {
				this.data.push(array[i]);
			}
			this.updateWidget();
		},
		
		removeData : function(index) {
			this.data.splice(index, 1);
			this.updateWidget();
		},
		
		clearData : function() {
			var array = [];
			this.setData(array);
		},
		
		updateWidget : function() {
			var bindWidget_length = this.bindWidget.length;
			for(var i = 0; i < bindWidget_length; i++) {
				if(!this.bindWidget[i]) break;
				if(this.bindWidget[i][0] == "data") {
					this.bindWidget[i][1].updateValue();
				} else if(this.bindWidget[i][0] == "items") {
					this.bindWidget[i][1].renderLayout();
				} else if(!this.bindWidget[i][1].getAttribute("index")) {
					this.bindWidget[i][1].updateWidgetbyModel(this.bindWidget[i][2]);
				}
			}
		},
		
		indexOf : function(obj) {
			var len = this.data.length;
			for(var i = 0; i < len; i++) {
				if(JSON.stringify(this.data[i]) == JSON.stringify(obj)) {
					return i;
				}
			}
			return -1;
		},
		
		validate : function(field, value){
					var validate_type = "";
					var index = null;
					
					if(this.validation.length == 0)
							return true;
								
					for (var i = 0; i < this.validation.length; i++) {
						if (this.validation[i]["field"] === field) {
							validate_type = this.validation[i]["type"];
							index=i;
							
						}
												
					};
	
				
					if(validate_type == ""){
						
						return true;
						
					};
					
					
					switch(validate_type){
						case "presence":
							if(value == null ){
								if (this.validation[index].hasOwnProperty('message')) {
									console.log(this.validation[index]["message"]);
								};
								return false;
							};
							break;
						case "length":
							if (value == null) {
																
								if (this.validation[index].hasOwnProperty('message')) {
										console.log(this.validation[index]["message"]);
								};
								return false;
							}else {
								if (value.length < this.validation[index]["min"]) {
									if (this.validation[index].hasOwnProperty('message')) {
										console.log(this.validation[index]["message"]);
									};
									return false;
								};
							};	
							break;
						case "inclusion":
							if (value != null) {
								if (this.validation[index]["list"].indexOf(value) === -1) {
									if (this.validation[index].hasOwnProperty('message')) {
										console.log(this.validation[index]["message"]);
									};	
									return false;
								};
							};
							break;
						case "exclusion":
							if (value != null) {
								if (this.validation[index]["list"].indexOf(value) != -1) {
									if (this.validation[index].hasOwnProperty('message')) {
										console.log(this.validation[index]["message"]);
									};
									return false;
									
								};
							};
							break;
						case "format":
							if (value != null) {
								if (value.match(this.validation[index]["matcher"]) != null) {
								
									if (this.validation[index].hasOwnProperty('message')) {
										console.log(this.validation[index]["message"]);
									};
									return false;
									
								};
							};
							break;
						default : 
							break;		
						
					}; 
					
					return true;
					
				
		},
		
		getValidate : function(field){
			 		
			
			 if(field != null){
			 	//Total Field Element Validation
			 	if(Array.isArray(this.data) && field.split(".").length ==1){
					 	var result =true;
					
						
						for(var j=0; j<this.validation.length; j++){
							console.log( this.validation[j]["field"]);
							if(this.validation[j]["field"] == field ){
								
								for (var i = 0; i < this.data.length; i++) {
									console.log( this.data.length);
									result = this.validate(field, this.data[i][field]);
									if(result == false){
										return false;
									}
										
								
								};
								return result;
							};
						};
						
						if(j==(this.validation.lnegth-1) ){
							return true;
						};	
						
				}else{// One Field Element Validation	
					var field_array = field.split(".");			 
					var test_value = this.getValue(field);
					return this.validate(field_array[field_array.length-1], test_value);
				
				};
			 }
			
		}
		
		

		
});

Top.Model.Controller = Top.extend({
	init : function() {
		var keys = Object.keys(this);
		var len = keys.length;
		for(var i = 0; i < len; i++) {
			var modelName = keys[i];
			var model = this[modelName];
			this[modelName] = Top.Model.extend(model);
		}
	}
});

Top.Controller = Top.extend({
	init : function() {
		var keys = Object.keys(this);
		var len = keys.length;
		for(var i = 0; i < len; i++) {
			var dataName = keys[i];
			if(typeof this[dataName] == 'object') {
				var data = this[dataName].data;
				this[dataName] = this[dataName].model.create({"data": data});
			}
		}
	}
});

Top.App = Top.extend({
	
});

Top.App.reopenClass({
	create : function(opts) {
		if(opts) {
			if(opts["config"])
				this.setConfigs(opts["config"]);
			else
				this.setConfigs();
			if(opts["event"])
				this.setEvent(opts["event"]);
			if(opts["route"])
				this.setRoute(opts["route"]);
		} else {
			this.setConfigs();
		}
		return this.appLoad();
	},
	
	appLoad : function() {
		this.execAppEvent("onAppLoad");
		if(!Top.curPage.getProperties("loaded")) {
			this.pageLoad(Top.curPage);
		}
		if(Top.curPage.getProperties("loaded")) {
			this.pageBeforeActivate(Top.curPage);
			this.showPage(Top.curPage.id);
			this.pageActivate(Top.curPage);
		}
	},
	
	pageLoad : function(page) {
		if(page.template.src) {
			page.template.srcLoad(function() {
				page.setProperties({loaded:true});
				Top.App.execPageEvent(page, "onLoad");
				if(!page.getProperties("activated")) {
					Top.App.pageBeforeActivate(page);
					Top.App.showPage(page.id);
					Top.App.pageActivate(page);
				}
			});
		} else {
			page.setProperties({loaded:true});
			this.execPageEvent(page, "onLoad");
		}
	},
	
	pageBeforeActivate : function(page) {
		this.execPageEvent(page, "onBeforeActivate");
	},
	
	pageActivate : function(page) {
		page.onActivate(function() {});
		Top.curPage = page;
		page.setProperties({activated:true});
		this.execPageEvent(page, "onActivate");
	},
	
	pageDeactivate : function(page) {
		page.onDeactivate(function() {});
		page.setProperties({activated:false});
		this.execPageEvent(page, "onDeactivate");
	},
	
	onpopstate : function(location) {
		var path = location.hash.replace('#!', '');
		if(path == "") {
			path = "/";
		}
		if(Top.curRoute.params) Top.curRoute.deact(Top.curRoute.params);
		if(Top.routeDeactCallback(Top.curRoute.path, path) && Top.routeActCallback(Top.curRoute.path, path)) {
			page();
			Top.curRoute.path = path;
		}
		this.execAppEvent("onpopstate");
	},
	
	setConfigs : function(configs) {
		Top.configs = config;
		if(configs) {
			var len = Object.keys(configs).length;
			for(var i = 0; i < len; i++) {
				var key = Object.keys(configs)[i];
				var value = configs[key];
				Top.configs[key] = value;
			}
		}
		this.setTitle(Top.configs.name);
		this.createPagesInternal();
	},
	
	getConfig : function(key) {
		return Top.configs[key];
	},
	
	getAllConfig : function() {
		return Top.configs;
	},
	
	setTitle : function(title) {
		document.title = title;
	},
	
	onAppLoad : function(func) {

		Top.appLoadEvents.push(func);

	},
	
	setEvent : function(events) {
		var len = Object.keys(events).length;
		for(var i = 0; i < len; i++) {
			var key = Object.keys(events)[i];
			var value = events[key];
			Top.appEvents.put(key, value);
		}
	},
	
	addAppEvent : function(event) {
		this.setEvent(event);
	},
	
	execAppEvent : function(event) {
		
		 if(event === "onAppLoad") {
            function appLoadFunc() {
                var len = Top.appLoadEvents.length;
                for(var i = 0; i < len; i++) {
                    Top.appLoadEvents[i]();
                }
            }
            Top.appEvents.put("onAppLoad", appLoadFunc);
        }

		
		if(Top.appEvents.containsKey(event)) {
			var func = Top.appEvents.getValue(event);
			if(typeof func === 'function') func();
		}
	},
	
	addPageEvent : function(page, event) {
		if(typeof page === 'string')
			page = Top.Dom.selectById(page);
		page.setProperties(event);
	},
	
	execPageEvent : function(page, event) {
		var func = page.template[event];
		if(typeof func === 'function') func();
	},
	
	setRoute : function(objs) {
		page();
		var len = Object.keys(objs).length;
		for(var i = 0; i < len; i++) {
			var from = Object.keys(objs)[i];
			var to = objs[from];
			this.addRoute(from, to);
		}
	},
	
	addRoute : function(from, to) {
		Top.routes.put(from, to.activate);
		if(!to.activate) {
			
		} else if(typeof to.activate === 'string') {
			function newTo2(ctx, next) {
				var pathName = Top.App.getOriginPath(ctx);
				var page = Top.pages.getValue(Top.routes.getValue(pathName));
				if(ctx.querystring) {
					page.setProperties({params:ctx.canonicalPath});
				} else {
					page.setProperties({params:ctx.params});
					Top.curRoute.params = ctx.params;
				}
				Top.curRoute.path = ctx.pathname;
				Top.curRoute.act = to.activate;
				if(to.deactivate) {
					Top.curRoute.deact = to.deactivate;
				} else {
					Top.curRoute.deact = function() {};
				}
				next();
			}
			function fn() {
				Top.App.goToInternal(to.activate);
			}
			page(from, newTo2, fn);
		} else {
            function newTo(ctx) {
				var pathName = Top.App.getOriginPath(ctx);
                if(ctx.querystring) {
                    Top.routes.getValue(pathName)(ctx.canonicalPath);
                } else {
                    Top.routes.getValue(pathName)(ctx.params);
					Top.curRoute.params = ctx.params;
                }
				Top.curRoute.path = ctx.pathname;
				Top.curRoute.act = to.activate;
				if(to.deactivate) {
					Top.curRoute.deact = to.deactivate;
				} else {
					Top.curRoute.deact = function() {};
				}
            }
            page(from, newTo);
		}
	},
	
	removeRoute : function(from) {
		var obj = {};
		obj[from] = {
			activate : function() {},
			deactivate : function() {}
		}
		this.setRoute(obj);
	},
	
	routeTo : function(path) {
		if(Top.curRoute.params) Top.curRoute.deact(Top.curRoute.params);
		if(Top.routeDeactCallback(Top.curRoute.path, path) && Top.routeActCallback(Top.curRoute.path, path)) {
			page(path);
		}
	},
	
	currentRoute : function() {
		var route = {};
		route.path = Top.curRoute.path;
		route.params = Top.curRoute.params;
		return route;
	},
	
	reload : function() {
		Top.curRoute.deact(Top.curRoute.params);
		Top.curRoute.act(Top.curRoute.params);
	},
	
	back : function() {
		window.history.back();
	},
	
	forward : function() {
		window.history.forward();
	},
	
	openWindow : function(path) {
		window.open(path);
	},
	
	getOriginPath : function(ctx) {
		var path = ctx.pathname;
		var obj = ctx.params;
		var keys = Object.keys(obj);
		var len = keys.length;
		for(var i = 0; i < len; i++) {
			path = path.replace(obj[keys[i]], ":" + keys[i]);
		}
		if(path.charAt(path.length - 1) == "/") {
			path = path.substring(0, path.length - 1);
		}
		return path;
	},
	
	goToInternal : function(pageId) {
		this.pageDeactivate(Top.curPage);
		var page = Top.pages.getValue(pageId);
		if(!page.getProperties("loaded")) {
			this.pageLoad(page);
		}
		if(page.getProperties("loaded")) {
			this.pageBeforeActivate(page);
			this.showPage(pageId);
			this.pageActivate(page);
		}
	},
	
	showPage : function(pageId) {
		Top.curPage.setProperties({visible:"none"});
		var page = Top.pages.getValue(pageId);
		page.setProperties({visible:"visible"});
	},
	
	createPagesInternal : function() {
		var elements = document.querySelectorAll("top-page");
		var cnt = elements.length;
		for(var i = 0; i < cnt; i++) {
			var element = elements[i];
			if(!Top.pages.containsKey(element.id)) {
				var properties = new Object();
				properties["id"] = element.id;
				properties["template"] = element;
				var widget = Top.Widget.createWidget("page", properties);
				Top.pages.put(widget.id, widget);
			}
		}
		Top.curPage = Top.pages.getValue(Top.configs["indexPageId"]);
		Top.curRoute.path = "/";
		Top.routeActCallback(Top.curRoute.path, Top.curRoute.path);
	},
	
	createPage : function(properties) {
		if(Top.pages.containsKey(properties.id)) {
			return Top.pages.getValue(properties.id);
		} else {
			var page = Top.Widget.createWidget("page", properties);
			Top.pages.put(page.id, page);
			return page;
		}
	},
	
	getAllPages : function() {
		return Top.pages;
	},
	
	getCurrentPage : function() {
		return Top.curPage;
	},
	
	getPage : function(pageId) {
		return Top.pages.getValue(pageId);
	},
	
	callbackAttach : function(widgetId) {
		var len = Top.attachCallback.length;
		for(var i = 0; i < len; i++) {
			Top.attachCallback[i](widgetId);
		}
	},
	
	callbackDetach : function(widgetId) {
		var len = Top.detachCallback.length;
		for(var i = 0; i < len; i++) {
			Top.detachCallback[i](widgetId);
		}
	},
	
	onAttach : function(func) {
		Top.attachCallback.push(func);
	},
	
	onDetach : function(func) {
		Top.detachCallback.push(func);
	},
	
	onRouteActivate : function(func) {
		Top.routeActCallback = func;
	},
	
	onRouteDeativate : function(func) {
		Top.routeDeactCallback = func;
	}
});

window.onpopstate = function(event) {
    Top.App.onpopstate(document.location);
};

Top.Dom = Top.extend({
	
});

Top.Dom.reopenClass({
	selectById : function(id) {
		var element = document.querySelector("#" + id);
		if(element == null) return null;
		
		return this.selectInternal(element);
		
	},
	
	select : function(selector) {
		var element = document.querySelectorAll(selector);
		var len = element.length;
		var widgets = [];
		for(var i = 0; i < len; i++) {
			var selected = this.selectInternal(element[i]);
			if(selected) widgets.push(selected);
		}
		return widgets;
	},
	
	selectInternal : function(element) {
		if(element == null) return null;
		if(element.tagName == "TOP-AJAX") return element;
		var type = element.tagName.replace("TOP-", "");
		type = type.toLowerCase();		
		if(type == null) {
			console.log("Type Error : Not defined");
			return null;
		} else if(type == "page") {
			if(Top.pages.containsKey(element.id)) {
				var widget = Top.pages.getValue(element.id);
			} else {
				console.log("The page cannot be found.");
			}
		} else {
			if(Top.activeWidgets.containsKey(element.id)) {
				Top.activeWidgets.remove(element.id);
			}
			var properties = new Object();
			properties["id"] = element.id;
			properties["template"] = element;
			var widget = Top.Widget.createWidget(type, properties);
			Top.activeWidgets.put(widget.id, widget);
		}
		return widget;
	},
	
	append : function(parentId, htmlString) {
		$("#" + parentId).append(htmlString);
	},
	
	appendToBody : function(widget) {
		if(typeof widget === 'string')
			widget = this.selectById(widget);
		var body = document.getElementsByTagName("body");
		body[0].appendChild(widget.template);
		Top.activeWidgets.put(widget.id, widget);
	},
	
	appendChild : function(parentId, widget) {
		if(typeof widget === 'string')
			widget = this.selectById(widget);
		var parentNode = document.getElementById(parentId);
		parentNode.appendChild(widget.template);
		Top.activeWidgets.put(widget.id, widget);
	},
	
	insertBefore : function(referId, widget) {
		if(typeof widget === 'string')
			widget = this.selectById(widget);
		var referNode = document.getElementById(referId);
		referNode.insertBefore(widget.template, referNode.childNodes[0]);
		Top.activeWidgets.put(widget.id, widget);
	},
	
	remove : function(widget) {
		if(typeof widget === 'object')
			id = Top.activeWidgets.getKey(widget);
		document.getElementById(id).remove();
		Top.activeWidgets.remove(id);
	}
});

Top.Ajax = Top.extend({
	
});

Top.Ajax.reopenClass({
	execute : function(id) {
		var element = Top.Dom.selectById(id);
		if(element) element.execute();
	},
	
	get : function(url, request, response, onSuccess, onFail) {
		if(typeof onSuccess === 'function') {
			successFunc = onSuccess;
		} else {
			successFunc = this.getSuccessFunc("", onSuccess, response);
		}
		if(typeof onFail === 'function') {
			failFunc = onFail;
		} else {
			failFunc = this.getFailFunc(onFail);
		}
		if(typeof request === 'string') {
			request = Top.Util.namespace(request)
		}
		var settings = new Object();
		settings["type"] = "GET";
		settings["data"] = request;
		settings["success"] = successFunc;
		settings["error"] = failFunc;
		$.ajax(url, settings);
	},
	
	post : function(url, request, response, onSuccess, onFail) {
		if(typeof onSuccess === 'function') {
			successFunc = onSuccess;
		} else {
			successFunc = this.getSuccessFunc("", onSuccess, response);
		}
		if(typeof onFail === 'function') {
			failFunc = onFail;
		} else {
			failFunc = this.getFailFunc(onFail);
		}
		if(typeof request === 'string') {
			request = Top.Util.namespace(request)
		}
		var settings = new Object();
		settings["type"] = "POST";
		settings["data"] = request;
		settings["success"] = successFunc;
		settings["error"] = failFunc;
		$.ajax(url, settings);
	},
	
	request : function(url, settings) {
		$.ajax(url, settings);
	},
	
	getSuccessFunc : function(id, onSuccess, response) {
		if(response) {
			var responseData = Top.Util.namespace(response);
		}
		if(onSuccess) {
			var success = Top.Util.namespace(onSuccess);
			successFunc = function(data, textStatus, jqXHR) {
				if(responseData && responseData.data) {
					$.each(JSON.parse(data), function(key, value) {
						responseData.setValue(key, value);
					});
				}
				success(id, data, textStatus, jqXHR);
			};
		} else {
			successFunc = function(data, textStatus, jqXHR) {
				if(responseData && responseData.data) {
					$.each(JSON.parse(data), function(key, value) {
						responseData.setValue(key, value);
					});
				}
			};
		}
		return successFunc;
	},
	
	getFailFunc : function(id, onFail) {
		if(onFail) {
			var fail = Top.Util.namespace(onFail);
			failFunc = function(jqXHR, textStatus, errorThrown) {
				fail(id, jqXHR, textStatus, errorThrown);
			};
		} else {
			failFunc = null;
		}
		return failFunc;
	}
});

Top.Util.reopenClass({
	namespace : function(string) {
		if(!string)
			return null;
		if(string.startsWith("/"))
			return function(){Top.App.routeTo(string);};
		
		var parts = string.split('.');
		var object = window;
		for(var i = 0; i < parts.length; i++) {
			if(typeof object[parts[i]] === "undefined") {
				object[parts[i]] = {};
			}
			object = object[parts[i]];
		}
		
		if(typeof object === "object" && object.tagName === "TOP-AJAX")
			return function() {Top.Ajax.execute(object.id);}
		else
			return object;
	},
	
	filter : function(obj, prop) {
		if(typeof prop === 'object') {
			var keys = Object.keys(prop);
			var len = keys.length;
			for(var i = 0; i < len; i++) {
				var key = keys[i];
				var value = prop[key];
				var len2 = obj.length;
				var ret = [];
				var k = 0;
				if(value === "") {
					ret = obj;
					k += len2;
				} else {
					for(var j = 0; j < len2; j++) {
						if(obj[j][key] === value) {
							ret[k] = obj[j];
							k++;
						}
					}
				}
				obj = ret;
			}
			return ret;
		} else if(typeof prop === 'function') {
			return arguments[0].filter(prop);
		}
	}
});

Top.URIHelper = Top.extend({
	URI : "",
	path : "",
	fragment : "",
	querystring : "",
	query : null,
	
	init : function() {
		this.fragment = this.URI.split('#')[1];
		this.path = this.URI.split('?')[0];
		this.querystring = this.URI.split('?')[1].split('#')[0];
		this.query = new Object();
		var temp = this.querystring.split('&');
		var len = temp.length;
		for(var i = 0; i < len; i++) {
			var temp2 = temp[i].split('=');
			var key = temp2[0];
			var value = temp2[1];
			this.query[key] = value;
		}
	},
	getPath : function() {
		return this.path;
	},
	getFragment : function() {
		return this.fragment;
	},
	getQuery : function() {
		return this.querystring;
	},
	getValue : function(key) {
		return this.query[key];
	}
});

Top.init();