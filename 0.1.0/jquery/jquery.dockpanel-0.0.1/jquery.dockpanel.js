
// Next:
//
// - Readme / Getting started docs
// - Samples
// - Mini layout of form items -- login page?
// - that android home bar example i saw
// - Interop with bootstrap's grid
//


// svbtle layout:  
// Depending on size sometimes the sidebar scrolls w/ content and sometimes it doesn't.
// https://github.com/cdussud/layer

// TODO:
// - Fix bug where 2nd panel on page doesn't get resize events
// - Allow Dockpanel to have a constrained height. 
// - make same panel type available in multiple places on the page
// - ensure it only does layout when it has children live and connected
// - allow children to size to content (i.e. take up vertical space)
// - define vertical alignment somehow
// - handle clipping / scrolling


(function(){
  var Layer = window.Layer = {};

  //
  // Classes
  //

  // Common base class. Meant to be abstract
  var Panel = (function(){
    function Panel($el){
      this.$el = $el;

      // TODO: is this overkill?
      // Note: multiple panels can't listen to this.
      self = this;
      $(window).resize(function(){
        self.layout();
      });
    }

    Panel.prototype.children = function(){
      return this.$el.children();
    };

    Panel.prototype.eachChild = function(callback){
      this.$el.children().each(function(index, item){
        var $child = $(item);
        $child.css('position','absolute'); // otherwise width measurements could take up whole client area

        callback(index, $child, $child.outerWidth(true), $child.outerHeight(true));
      });
    }

    Panel.prototype.width = function(){
      return this.$el.width();
    };

    Panel.prototype.height = function(){
      return this.$el.height();
    };

    return Panel;
  })();

  var DockPanel = Layer.DockPanel = (function(){
    __extends(DockPanel, Panel);

    function DockPanel($el){
      this.base($el);

      // save off child's initial layout width
      var initialChildWidths = [];
      this.eachChild(function(index, $child, width, height) {
        initialChildWidths.push(width);
      });

      this.initialChildWidths = initialChildWidths;
      this.layout();
    }

    function updateContentArea(contentArea, $child, width, height) {
      // This is actually the core of the layout algorithm.
      // It updates the content area rectangle with the space left after
      // the given child is added to the panel.

      if ($child.hasClass('dock-top')) {
        contentArea.y += height;
        contentArea.height -= height;
      }
      else if ($child.hasClass('dock-left')) {
        contentArea.x += width;
        contentArea.width -= width;
      }
      else if ($child.hasClass('dock-right')) {
        contentArea.width -= width;
      }
      else if ($child.hasClass('dock-bottom')) {
        contentArea.height -= height;
      }

      return contentArea;
    }

 
    DockPanel.prototype.measureHeight = function() {

      // Simply compute the total height.
      // This requires running the layout algorithm and keeping track of when a child grows past the available area.
      // Compute the position of each child as normal.
      // Keep two offsets as we go: the highest docked bottom element and the lowest docked top. 
      // If during layout a child crosses either of these lines then we need to increase the total height. 
      // The two lines are the top and bottom of the content area rectangle.

      var totalHeight = 0;
      var totalWidth = 0;
      var contentArea = new Rect(0, 0, 0, 0);  // Rectangle tracking how much space is left for elements. Grows to accomodate children.
      var initialChildWidths = this.initialChildWidths;

      this.eachChild(function(index, $child, width, height) {

        width = initialChildWidths[index];

        if (contentArea.height < height) {
          totalHeight += height - contentArea.height;
          contentArea.height = height;
        }

        // We'll do the same for width: this enforces that the minimum width of the panel is what lays out the children.
        if (contentArea.width < width) {
          totalWidth += width - contentArea.width;
          contentArea.width = width;
        }
          
        contentArea = updateContentArea(contentArea, $child, width, height);
      });

      // Set the panel's height now that we know it.
      this.$el.height(totalHeight);

      if (totalWidth > this.width()) {
        this.$el.css('min-width', totalWidth);
      }
      return totalHeight;
    }



    DockPanel.prototype.layout = function() {

      // Sizes the children and places them properly;

      // TODO: what if children don't specify how they dock?
      // TODO: deal with what happens when we run out of space.
    
      // Width: Don't ever size to content. Just use the given numerical value.
      // Height: Size to content if specified height is 'auto'. Otherwise read the height numerically and use that.
      
      var numChildren = this.children().length;
      //var contentHeight = this.measureHeight();
      //var contentWidth = this.width();
    var contentHeight = this.height();
	var contentWidth = this.width();
	
      var contentArea = new Rect(0, 0, contentWidth, contentHeight);

      this.eachChild(function(index, $child, width, height) {

        var offsetX = contentArea.x;
        var offsetY = contentArea.y;

        if (index < numChildren )
        {
          if ($child.hasClass('dock-top')){
            setOuterWidth($child, contentArea.width);
          }
          else if ($child.hasClass('dock-left')){
          	 setOuterHeight($child, contentArea.height);
			 //setOuterWidth($child, contentArea.width);
			//setOuterWidth($child, "300px");
          }
          else if ($child.hasClass('dock-right')){
            setOuterHeight($child, contentArea.height);
            offsetX = contentArea.right() - width;
          }
          else if ($child.hasClass('dock-bottom')){
            setOuterWidth($child, contentArea.width);
            offsetY = contentArea.bottom() - height;
          }
        }


        // Position the children
        contentArea = updateContentArea(contentArea, $child, width, height);

        $child.css({
          transform: 'translate(' + offsetX + 'px, ' + offsetY + 'px)'
        });
      });
    };

    return DockPanel;

  })();

  var WrapPanel = (function(){
    __extends(WrapPanel, Panel);

    function WrapPanel($el){
      this.base($el);
      this.layout();
    }


    WrapPanel.prototype.layout = function() {
      
      var availableWidth = this.$el.width();
      var offsetX = 0;
      var offsetY = 0;
      var rowHeight = 0;

      this.eachChild(function(index, $child, width, height) {

        rowHeight = rowHeight < height ? height : rowHeight;

        if (offsetX + width > availableWidth && offsetX > 0) // offsetX > 0: if first element in a row is too big for the row, place it anyway.
        {
          offsetY += rowHeight;
          rowHeight = height;  // reset row height for the new row
          offsetX = 0;
        }

        // Lay out the children
        $child.css({
          transform: 'translate(' + offsetX + 'px, ' + offsetY + 'px)'
        });

        offsetX += width;

      });

      // Give the panel a height based on the children
      this.$el.height(offsetY + rowHeight);
    };

    return WrapPanel;

  })();


  // TODO: allow vertical layout too
  var StackPanel = (function(){
    __extends(StackPanel, Panel);

    function StackPanel($el, horizontal){
      this.base($el);
      this.horizontal = (horizontal !== undefined ? horizontal : true)
      this.layout();
    }

    StackPanel.prototype.layout = function() {      
      var totalWidth = 0;
      var maxHeight = 0;

      this.eachChild(function(index, $child, width, height) {

        $child.css("transform","translateX(" + totalWidth + "px)");
        totalWidth += width;

        maxHeight = maxHeight < height ? height : maxHeight;

      });

      // Give the panel a width and height based on the children
      this.$el.width(totalWidth);
      this.$el.height(maxHeight);
    };

    return StackPanel;

  })();


  // Manages the instances of the panels on a page
  var Controller = (function(){

    var panelClasses = { 
      dockpanel : DockPanel, 
      stackpanel : StackPanel, 
      wrappanel : WrapPanel };

    function Controller(){
      $(function(){

        // On document.ready instantiate and attach the panels.
        // TODO: handle multiple of the same type on the page
        for (var cssClass in panelClasses) {
          var $element = $('.' + cssClass);
          if ($element.length) {
            var x = new panelClasses[cssClass]($element);
          }
        }
      });
    }

    return Controller;
  })();

  var controller = new Controller();

  //
  // Utilities
  //

  function Rect(x, y, width, height){
    // TODO: default to 0
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  Rect.prototype.bottom = function(){
    return this.y + this.height;
  };

  Rect.prototype.right = function(){
    return this.x + this.width;
  };

  function Point(x, y){
    this.x = x;
    this.y = y;
  }

  function setOuterWidth($element, width){
    $element.width(width - ($element.outerWidth(true) - $element.width()))
  }

  function setOuterHeight($element, height){
    $element.height(height - ($element.outerHeight(true) - $element.height()))
  }

  // Prototypical inheritance.
  function __extends(child, parent){
    function ctor() { 
      this.constructor = child; 
    } 

    // instance variables (properties)
    $.extend(child, parent);  

    ctor.prototype = parent.prototype; 
    child.prototype = new ctor(); 
    child.__super__ = parent.prototype; 

    // Add function for the child to call the parent constructor
    parent.prototype.base = function(){
      return parent.apply(this, arguments);
    }

    return child;
  } 
}).call(this);