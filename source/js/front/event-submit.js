"use strict";

// Init submit event form
EventManagerIntegration = EventManagerIntegration || {};
EventManagerIntegration.Event = EventManagerIntegration.Event || {};

EventManagerIntegration.Event.Form = (function ($) {

    function Form() {
    	$(".submit-event").each(function(index, eventForm) {
    		var apiUrl 		= eventintegration.apiurl,
    			apiUrl 		= apiUrl.replace(/\/$/, "");

			$('#recurring-event', eventForm).children('.box').hide();

        	this.handleEvents($(eventForm), apiUrl);
        	if (document.getElementById('location') !== null) {
        		this.loadPostType($(eventForm), apiUrl, 'location');
        	}
        	if (document.getElementById('organizer') !== null) {
        		this.loadPostType($(eventForm), apiUrl, 'organizer');
        	}
        	if (document.getElementById('user_groups') !== null) {
        		this.loadTaxonomy($(eventForm), apiUrl, 'user_groups');
        	}
        	if (document.getElementById('event_categories') !== null) {
        		this.loadTaxonomy($(eventForm), apiUrl, 'event_categories');
        	}
        }.bind(this));
    }

    // Get taxonomies from API and add to select box
    Form.prototype.loadTaxonomy = function(eventForm, resource, taxonomy) {
    	resource += '/' + taxonomy + '?_jsonp=' + taxonomy + '&per_page=100';
    	var select = document.getElementById(taxonomy);

        $.ajax({
            type: "GET",
            url: resource,
            cache: false,
            dataType: "jsonp",
            jsonpCallback: taxonomy,
            crossDomain: true,
            success: function(response) {
            	// Clear select
            	$(select).html('');
        		var taxonomies = Form.prototype.hierarchicalTax(response);
				// Add select option and it's children taxonomies
            	$(taxonomies.children).each(function(index, tax) {
            		// Parent option
				    Form.prototype.addOption(tax, select, '');
				    $(tax.children).each(function(index, tax) {
				    	// Children option
				    	Form.prototype.addOption(tax, select, ' – ');
						$(tax.children).each(function(index, tax) {
						   	// Grand children options
							Form.prototype.addOption(tax, select, ' – – ');
			    		});
	    			});
	    		});
            }
        });
    };

	Form.prototype.addOption = function(taxonomy, select, depth) {
     	var opt 			= document.createElement('option');
			opt.value 		= taxonomy.data.id;
			opt.innerHTML 	+= depth;
			opt.innerHTML 	+= taxonomy.data.name;
			select.appendChild(opt);
    };

	function TreeNode(data) {
		this.data     = data;
		this.parent   = null;
		this.children = [];
	}

	TreeNode.comparer = function(a, b) {
	  	return a.data.name < b.data.name ? 0 : 1;
	};

	TreeNode.prototype.sortRecursive = function() {
 		this.children.sort(Form.prototype.comparer);
  		for (var i = 0, l = this.children.length; i < l; i++) {
    		this.children[i].sortRecursive();
 		}
 		return this;
 	};

 	// List taxonomy objects hierarchical
	Form.prototype.hierarchicalTax = function(data) {
		var nodeById = {}, i = 0, l = data.length, node;

		// Root node
		nodeById[0] = new TreeNode();

		// Make TreeNode objects for each item
		for (i = 0; i < l; i++) {
			nodeById[data[i].id ] = new TreeNode(data[i]);
		}
		// Link all TreeNode objects
		for (i = 0; i < l; i++) {
			node = nodeById[data[i].id];
			node.parent = nodeById[node.data.parent];
			node.parent.children.push(node);
		}

		return nodeById[0].sortRecursive();
	};

    // Get a post type from API and add to select box
    Form.prototype.loadPostType = function(eventForm, resource, postType) {
    	resource += '/' + postType + '/complete?_jsonp=get' + postType;
    	var select = document.getElementById(postType);

        $.ajax({
            type: "GET",
            url: resource,
            cache: false,
            dataType: "jsonp",
            jsonpCallback: 'get' + postType,
            crossDomain: true,
            success: function(response) {
            	//Clear select
				$(select).html('');

				//Add empty select choice
			    var opt 		= document.createElement('option');
			    opt.value 		= '';
			    opt.innerHTML 	= "- Välj -";
			    select.appendChild(opt);

				//Add select options
            	$(response).each(function(index, item) {
				    var opt 		= document.createElement('option');
				    opt.value 		= item.id;
				    opt.innerHTML 	= item.title;
				    select.appendChild(opt);
	    		});
            }
        });
    };

    // Save+format input data and return as object
	Form.prototype.jsonData = function(form) {
	    var arrData 	= form.serializeArray(),
	        objData 	= {},
	        groups 		= [],
	        categories	= [];

	    $.each(arrData, function(index, elem) {
	    	switch(elem.name) {
	    		case 'user_groups':
	    			groups.push(parseInt(elem.value));
			        break;
			    case 'event_categories':
	    			categories.push(parseInt(elem.value));
			        break;
			    default:
			        objData[elem.name] = elem.value;
			}
	    });

	    // Occasion
	    objData['occasions'] = [];
	    $('.occurance-group', form).each(function(index) {
			var startDate 	= Form.prototype.formatDate($('[name="start_date"]', this).val(), $('[name="start_time_h"]', this).val(), $('[name="start_time_m"]', this).val());
		    var endDate 	= Form.prototype.formatDate($('[name="end_date"]', this).val(), $('[name="end_time_h"]', this).val(), $('[name="end_time_m"]', this).val());
		    if (startDate && endDate) {
		    	objData['occasions'].push({
		    						"start_date": startDate,
		    						"end_date": endDate,
		    						"status": "scheduled",
		    						"content_mode": "master"
		    						});
		    }
		});

	    // Recurring occasions
	    var rcrStartH 		= $(form).find("#recurring_start_h").val(),
	    	rcrStartM 		= $(form).find("#recurring_start_m").val();
	    var rcrStartTime 	= (rcrStartH && rcrStartM) ? this.addZero(rcrStartH) + ":" + this.addZero(rcrStartM) + ":" + "00" : false;
	    var rcrEndH 		= $(form).find("#recurring_end_h").val(),
	    	rcrEndM 		= $(form).find("#recurring_end_m").val();
	    var rcrEndTime 		= (rcrEndH && rcrEndM) ? this.addZero(rcrEndH) + ":" + this.addZero(rcrEndM)  + ":" + "00": false;
	    var rcrStartDate 	= (this.isValidDate($(form).find("#recurring_start_d").val())) ? $(form).find("#recurring_start_d").val() : false;
	    var rcrEndDate 		= (this.isValidDate($(form).find("#recurring_end_d").val())) ? $(form).find("#recurring_end_d").val() : false;
	    if (rcrStartTime && rcrEndTime && rcrStartDate && rcrEndDate) {
		  	objData['rcr_rules']	= [{
		    						"rcr_week_day": $(form).find("#weekday").val(),
		    						"rcr_start_time": rcrStartTime,
		    						"rcr_end_time": rcrEndTime,
		    						"rcr_start_date": rcrStartDate,
		    						"rcr_end_date": rcrEndDate,
		    						}]
	    }
	    if ($(form).find("#organizer").val()) {
	    	objData['organizers'] 	= [{
		    						"organizer": $(form).find("#organizer").val(),
		    						"main_organizer": true
		    						}];
	    }
		objData['user_groups'] 		= groups;
		objData['event_categories'] = categories;

	    // console.log(objData);
	    // console.log(JSON.stringify(objData));
	    return objData;
	};

    // Send Ajax request with media data
    Form.prototype.submitImageAjax = function(eventForm, imageData){
    	imageData.append('action', 'submit_image');
		return $.ajax({
	        url: eventintegration.ajaxurl,
	        type: "POST",
			cache: false,
            contentType: false,
            processData: false,
            data: imageData,
		    error: function(jqXHR, textStatus) {
		    	console.log(textStatus);
		    }
	    });
    };

    // Send Ajax request with post data
    Form.prototype.submitEventAjax = function(eventForm, formData){
		$.ajax({
	        url: eventintegration.ajaxurl,
	        type: "POST",
	        data: {
	            action : "submit_event",
	            data : formData
	        },
	        success: function(response) {
	            if (response.success) {
	            	$('.submit-success', eventForm).removeClass('hidden');
					$('.submit-success .success', eventForm).empty().append('<i class="fa fa-send"></i>Evenemanget har skickats!</li>');
	            	//Form.prototype.cleanForm(eventForm);
	            } else {
	            	console.log(response.data);
	            	$('.submit-success', eventForm).addClass('hidden');
	            	$('.submit-error', eventForm).removeClass('hidden');
					$('.submit-error .warning', eventForm).empty().append('<i class="fa fa-warning"></i>' + response.data + '</li>');
	            }
	        },
		    error: function(jqXHR, textStatus) {
		    	$('.submit-success', eventForm).addClass('hidden');
		    	$('.submit-error', eventForm).removeClass('hidden');
				$('.submit-error .warning', eventForm).empty().append('<i class="fa fa-warning"></i>'+textStatus+'</li>');
		    }
	    });
    };

    Form.prototype.handleEvents = function(eventForm, apiUrl) {
		$(eventForm).on('submit', function(e) {
		    e.preventDefault();

		   	$('.submit-error', eventForm).addClass('hidden');
        	$('.submit-success', eventForm).removeClass('hidden');
			$('.submit-success .success', eventForm).empty().append('<i class="fa fa-send"></i>Skickar...</li>');

		    var fileInput  	= eventForm.find('#image-input'),
    			formData 	= Form.prototype.jsonData(eventForm),
		    	imageData 	= new FormData();

		    // Upload media first and append it to the post.
		    if (fileInput.val()) {
		    	imageData.append('file', fileInput[0].files[0]);
			    $.when(Form.prototype.submitImageAjax(eventForm, imageData))
			    .then(function(response, textStatus) {
			    	if (response.success) {
			    		formData['featured_media'] 	= response.data;
						Form.prototype.submitEventAjax(eventForm, formData);
			    	} else {
			    		$('.submit-success', eventForm).addClass('hidden');
						$('.submit-error', eventForm).removeClass('hidden');
						$('.submit-error .warning', eventForm).empty().append('<i class="fa fa-warning"></i>' + response.data + '</li>');
			    	}
				});
			// Submit post if media is not set
		    } else {
		    	Form.prototype.submitEventAjax(eventForm, formData);
		    }
		});

		// Show image approval terms
		$('.img-button', eventForm).click(function(e) {
			e.preventDefault();
			$('.image-box', eventForm).hide();
			$('.image-approve', eventForm).fadeIn();
		});

		// Show additional terms
        $('input:radio[name=approve]', eventForm).change(function() {
            if (this.value == 1) {
                $('#persons-approve', eventForm).removeClass('hidden');
            } else {
                $('#persons-approve', eventForm).addClass('hidden');
            }
        });

        // Show uploader if terms is approved
        $('input[name=approve]', eventForm).change(function() {
            var firstCheck  = $('input:checkbox[id=first-approve]:checked', eventForm).length > 0,
                radioCheck  = $('input:radio[name=approve]:checked', eventForm).val(),
                secondCheck = $('input:checkbox[id=second-approve]:checked', eventForm).length > 0;
            if (firstCheck && radioCheck == 0 || firstCheck && secondCheck) {
                $('.image-approve', eventForm).hide();
                $('.image-upload', eventForm).fadeIn();
            }
        });

		// Show/hide occasion and reccuring occasion rules. And add required fields.
		$('input:radio[name=occurance-type]', eventForm).change(function (event) {
    		var id = $(this).data('id');
    		$('#' + id).children('.form-group .box').show().
    			find('input').prop('required', true);
    		$('#' + id).siblings('.event-occasion').children('.box').hide().
    			find('input').prop('required', false);
		});

		// Add new occurance
		$('.add-occurance', eventForm).click(function(e) {
			e.preventDefault();
			var $occuranceGroup = $(this).parent().prev('.occurance-group'),
        		$duplicate = $occuranceGroup.clone().find('input').val('')
        					.removeClass('hasDatepicker')
        					.removeAttr('id').end()
        					.insertAfter($occuranceGroup)
        					.find('.datepicker').datepicker().end();

			if ($('.remove-occurance', $duplicate).length === 0) {
				var $removeButton = $('<div class="form-group"><button class="btn btn btn-sm remove-occurance"><i class="pricon pricon-minus-o"></i> Ta bort</button></div>');
        		$duplicate.append($removeButton);
			}
		});

		// Remove occurance
		$(document).on('click', '.remove-occurance', function(e) {
			e.preventDefault();
			$(this).closest('.occurance-group').remove();
		});
    };

    // Clean up form
    Form.prototype.cleanForm = function (eventForm) {
		$(':input', eventForm)
		.not(':button, :submit, :reset, :hidden, select')
		.val('')
		.removeAttr('selected');
    };

	// Format date and time
	Form.prototype.formatDate = function(date, hh, mm) {
		var dateTime = "";
		if (this.isValidDate(date) && hh && mm) {
			dateTime = date + "T" + this.addZero(hh) + ":" + this.addZero(mm) + ":" + "00";
	   	}
		return dateTime;
	};

	// Check valid date format
	Form.prototype.isValidDate = function(dateString){
		var regEx = /^\d{4}-\d{2}-\d{2}$/;
		return dateString.match(regEx) != null;
	};

	// Prefix with zero
    Form.prototype.addZero = function (i) {
    	if(i.toString().length === 1) {
        	i = "0" + i;
    	}
        return i;
    };

	return new Form();
})(jQuery);
