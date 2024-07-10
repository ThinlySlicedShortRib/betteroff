window.clearDropdownSelect = function clearDropdownSelect(formElement) {
    if (formElement) {
        // Find all elements within the form with the attribute fs-selectcustom-element="clear"
        const clearElements = formElement.querySelectorAll(
            '[fs-selectcustom-element="clear"]',
        );

        // Iterate through each element and trigger a click event
        clearElements.forEach((element) => {
            element.click();
        });
    } else {
        console.error("Form not found using the clearDropdownSelect function");
    }
};


window.deselectRadios = function deselectRadios(radioName) {
    const radios = document.getElementsByName(radioName);
    radios.forEach((radio) => {
        radio.checked = false;
    });
};


window.extractMonthName = function extractMonthName(inputDate) {
    const dateParts = inputDate.split("-");
    const monthNumber = parseInt(dateParts[1]);

    // Define an array of month names
    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    return monthNames[monthNumber - 1];
};

window.extractYear = function extractYear(inputDate) {
    const dateParts = inputDate.split("-");
    return parseInt(dateParts[0]);
};

window.extractDay = function extractDay(inputDate) {
    const dateParts = inputDate.split("-");
    return parseInt(dateParts[2]);
};



window.iso_date = function iso_date(day, month, year) {
    function createISODate(day, month, year) {
        // Define a map for month names to month numbers
        const monthMap = {
            January: 1,
            February: 2,
            March: 3,
            April: 4,
            May: 5,
            June: 6,
            July: 7,
            August: 8,
            September: 9,
            October: 10,
            November: 11,
            December: 12,
        };

        // Get the month number from the month name
        const monthNumber = monthMap[month];

        // Create a date object
        const dateObject = new Date(year, monthNumber - 1, day, 12, 0, 0);

        // Convert to ISO date format (YYYY-MM-DD)
        const isoDate = dateObject.toISOString().split("T")[0];

        return isoDate;
    }

    if (day && month && year) {
        const isoDate = createISODate(day, month, year);
        console.log("ISO Date:", isoDate); // Output: ISO Date: 2000-12-29
        return isoDate;
    } else {
        return null;
    }
};


window.iso_generate = function iso_date(day, month, year) {
    function createISODate(AHday, AHmonth, AHyear) {
        // Define a map for month names to month numbers
        const monthMap = {
            'January': 1, 'February': 2, 'March': 3, 'April': 4,
            'May': 5, 'June': 6, 'July': 7, 'August': 8,
            'September': 9, 'October': 10, 'November': 11, 'December': 12
        };

        // Get the month number from the month name
        const monthNumber = monthMap[AHmonth];

        // Create a date object
        const dateObject = new Date(Date.UTC(AHyear, monthNumber - 1, AHday));

        // Convert to ISO date format (YYYY-MM-DD)
        const isoDate = dateObject.toISOString().split('T')[0];

        return isoDate;
    }


    if (day && month && year) {
        const isoDate = createISODate(day, month, year);
        console.log("ISO Date:", isoDate); // Output: ISO Date: 2000-12-29
        return isoDate;
    } else {
        return null;
    }

}

//this function takes in 2 parameters,
//1. complete attribute of the child
//2. the option to show or hide. either "show", "hide"
window.nextQuestionHide = function nextQuestionHide(childElement) {
    // Find the summary and form elements by their `wized` attribute values
    const child = document.querySelector(childElement);
    const parent = child ? child.closest('[wized="question_wrapper"]') : null;
    // Reset visibility classes
    if (parent) {
        parent.classList.remove("show-now");
        parent.classList.add("hide");
    }
};


window.reset = function reset(form) {
    // Select the form element using its 'wized' attribute
    var form = document.querySelector(form);

    // Check if the form element exists
    if (form) {
        form.reset();
        /* // Get all form controls within the form
             var formControls = form.querySelectorAll('input, textarea, select');
         
             // Iterate through each form control and reset its value
             formControls.forEach(function(control) {
                 // Reset the value of the control
                 control.value = '';
             });*/
    } else {
        console.error(`Form with attribute ${form} not found.`);
    }
};


window.resetForm = function resetForm(formName) {
    let form = formName; // Assuming 'formName' is an object reference to the form

    // Iterate over all properties in the form object
    for (let key in form) {
        // Check if the form has its own property (not inherited)
        if (form.hasOwnProperty(key)) {
            // Set each property's value to an empty string
            form[key] = "";
        }
    }
};
console.log("resetForm fucntion loaded from CodeSandBox");


// This function now directly accepts an HTML element
window.scrollToNextQuestionElement = function scrollToNextQuestionElement(
    element,
) {
    setTimeout(() => {
        if (element) {
            const elementRect = element.getBoundingClientRect();
            const elementTopViewport = elementRect.top;
            const offset = 214; // This offset can be adjusted if needed
            const scrollTop =
                window.pageYOffset || document.documentElement.scrollTop;
            const absoluteElementTop = scrollTop + elementTopViewport;
            const targetPosition = absoluteElementTop - offset;

            scrollToElement(targetPosition);
        }
    }, 800);
};

/**
 * Smoothly scrolls to the target position using an ease-out effect.
 * @param {number} targetPosition - The y-coordinate to scroll to.
 */
function scrollToElement(targetPosition) {
    const start = window.pageYOffset || document.documentElement.scrollTop;
    const change = targetPosition - start;
    const duration = 1000; // Duration of the animation in milliseconds
    let startTime = null;

    function animateScroll(currentTime) {
        if (!startTime) {
            startTime = currentTime;
        }
        const timeElapsed = currentTime - startTime;
        const next = easeOut(timeElapsed, start, change, duration);

        window.scrollTo(0, next);

        if (timeElapsed < duration) {
            requestAnimationFrame(animateScroll);
        }
    }

    function easeOut(t, b, c, d) {
        t /= d;
        t--;
        return c * (t * t * t + 1) + b;
    }

    requestAnimationFrame(animateScroll);
}


//this is a new scroll interaction function that works with
//the new question visiblility logic

window.scrollToNextQuestionNew = function scrollToNextQuestionNew(target) {
    setTimeout(() => {
        const questionWrapper = document.querySelector(target);

        if (questionWrapper) {
            const elementRect = questionWrapper.getBoundingClientRect();
            const elementTopViewport = elementRect.top;
            const offset = 214;
            const scrollTop =
                window.pageYOffset || document.documentElement.scrollTop;
            const absoluteElementTop = scrollTop + elementTopViewport;
            const targetPosition = absoluteElementTop - offset;

            scrollToElement(targetPosition);
        }
    }, 400);
};

/**
 * Smoothly scrolls to the target position using an ease-out effect.
 * @param {number} targetPosition - The y-coordinate to scroll to.
 */
function scrollToElement(targetPosition) {
    const start = window.pageYOffset || document.documentElement.scrollTop;
    const change = targetPosition - start;
    const duration = 1000; // Duration of the animation in milliseconds
    let startTime = null;

    function animateScroll(currentTime) {
        if (!startTime) {
            startTime = currentTime;
        }
        const timeElapsed = currentTime - startTime;
        const next = easeOut(timeElapsed, start, change, duration);

        window.scrollTo(0, next);

        if (timeElapsed < duration) {
            requestAnimationFrame(animateScroll);
        }
    }

    function easeOut(t, b, c, d) {
        t /= d;
        t--;
        return c * (t * t * t + 1) + b;
    }

    requestAnimationFrame(animateScroll);
}


window.toggleFormAndSummary = function toggleFormAndSummary(
    formId,
    summaryId,
    showElement,
) {
    // Find the summary and form elements by their `wized` attribute values
    const summaryElement = document.querySelector(`[wized="${summaryId}"]`);
    const summaryWrapper = summaryElement
        ? summaryElement.closest('[wized="plan_summary_wrapper"]')
        : null;
    const formElement = document.querySelector(`[wized="${formId}"]`);
    const formWrapper = formElement
        ? formElement.closest('[wized="plan_form_wrapper"]')
        : null;

    // Reset visibility classes if wrappers are found
    if (formWrapper) {
        formWrapper.classList.remove("show-now", "hide");
    }
    if (summaryWrapper) {
        summaryWrapper.classList.remove("show-now", "hide");
    }

    switch (showElement) {
        case "summary":
            // Show summary, hide form
            if (formWrapper) {
                formWrapper.classList.add("hide");
            }
            if (summaryWrapper) {
                summaryWrapper.classList.add("show-now");
            }
            break;
        case "form":
            // Hide summary, show form
            if (summaryWrapper) {
                summaryWrapper.classList.add("hide");
            }
            if (formWrapper) {
                formWrapper.classList.add("show-now");
            }
            break;
        case "both":
            // Show both summary and form
            if (summaryWrapper) {
                summaryWrapper.classList.add("show-now");
            }
            if (formWrapper) {
                formWrapper.classList.add("show-now");
            }
            break;
        case "none":
            // Hide both summary and form
            if (summaryWrapper) {
                summaryWrapper.classList.add("hide");
            }
            if (formWrapper) {
                formWrapper.classList.add("hide");
            }
            break;
        default:
            console.error("Invalid action specified");
    }
};

//This function opens and closes modals based on the give wized attribute
window.toggleModal = function toggleModal(modalId, isOpen) {
    const modalWrapper = document.querySelector(`[wized="${modalId}"]`);

    // Select the <body> element
    const bodyElement = document.body;

    if (modalWrapper) {
        modalWrapper.classList.toggle("is-open", isOpen);
        bodyElement.classList.toggle("no-scroll", isOpen);
        // v.modal_state[modalId] = isOpen;
        const modalElement = modalWrapper.querySelector(".modal_content-wrapper");
        if (modalElement) {
            setTimeout(() => {
                modalElement.classList.toggle("is-open", isOpen);
            }, 100);
        }

        //Both "is-open" and "no-scroll" class are defined in Webflow
    }
};


//this function takes in 2 parameters,
//1. complete attribute of the child
//2. the option to show or hide. either "show", "hide"
window.toggleParent = function toggleParent(childElement, visibility) {
    // Find the summary and form elements by their `wized` attribute values
    const child = document.querySelector(childElement);
    const parent = child ? child.closest('[wized="question_wrapper"]') : null;

    // Reset visibility classes
    if (parent) {
        parent.classList.remove("show-now", "hide");
    }

    if (visibility === "hide") {
        // Show summary, hide form
        if (parent) {
            parent.classList.add("hide");
        }
    } else if (visibility === "show") {
        // Hide summary, show form
        if (parent) {
            parent.classList.add("show-now");
        }
    } else {
        console.error("Invalid action specified");
    }
};


//this function takes in 2 parameters,
//1. complete attribute of the child
//3. the option to show or hide. either "show", "hide"
window.toggleSummary = function toggleSummary(summary, visibility) {
    // Find the summary and form elements by their `wized` attribute values

    //remove selector
    const selector = document.querySelector(summary);
    const wrapper = selector
        ? selector.closest('[wized="plan_summary_wrapper"]')
        : null;

    // Reset visibility classes
    if (wrapper) {
        wrapper.classList.remove("show-now", "hide");
    }
    if (wrapper) {
        wrapper.classList.remove("show-now", "hide");
    }

    if (visibility === "hide") {
        // Show summary, hide form
        if (wrapper) {
            wrapper.classList.add("hide");
        }
    } else if (visibility === "show") {
        // Hide summary, show form
        if (wrapper) {
            wrapper.classList.add("show-now");
        }
    } else {
        console.error("Invalid action specified");
    }
};


window.addEventListener('pageshow', function (event) {
    if (event.persisted) {
        // Page was loaded from cache, refresh the UI or reset the state
        location.reload();
    }
});


window.toggleFormAndSummary = function toggleFormAndSummary(
    formId,
    summaryId,
    showElement,
) {
    // Find the summary and form elements by their `wized` attribute values
    const summaryElement = document.querySelector(`[wized="${summaryId}"]`);
    const summaryWrapper = summaryElement
        ? summaryElement.closest('[wized="plan_summary_wrapper"]')
        : null;
    const formElement = document.querySelector(`[wized="${formId}"]`);
    const formWrapper = formElement
        ? formElement.closest('[wized="plan_form_wrapper"]')
        : null;

    // Reset visibility classes if wrappers are found
    if (formWrapper) {
        formWrapper.classList.remove("show-now", "hide");
    }
    if (summaryWrapper) {
        summaryWrapper.classList.remove("show-now", "hide");
    }

    switch (showElement) {
        case "summary":
            // Show summary, hide form
            if (formWrapper) {
                formWrapper.classList.add("hide");
            }
            if (summaryWrapper) {
                summaryWrapper.classList.add("show-now");
            }
            break;
        case "form":
            // Hide summary, show form
            if (summaryWrapper) {
                summaryWrapper.classList.add("hide");
            }
            if (formWrapper) {
                formWrapper.classList.add("show-now");
            }
            break;
        case "both":
            // Show both summary and form
            if (summaryWrapper) {
                summaryWrapper.classList.add("show-now");
            }
            if (formWrapper) {
                formWrapper.classList.add("show-now");
            }
            break;
        case "none":
            // Hide both summary and form
            if (summaryWrapper) {
                summaryWrapper.classList.add("hide");
            }
            if (formWrapper) {
                formWrapper.classList.add("hide");
            }
            break;
        default:
            console.error("Invalid action specified");
    }
};

//this function takes in 2 parameters,
//1. complete attribute of the child
//2. the option to show or hide. either "show", "hide"
window.toggleForm = function toggleForm(form, visibility) {
    // Find the summary and form elements by their `wized` attribute values

    //remove selector
    const selector = document.querySelector(form);
    const wrapper = selector
        ? selector.closest('[wized="plan_form_wrapper"]')
        : null;

    // Reset visibility classes
    if (wrapper) {
        wrapper.classList.remove("show-now", "hide");
    } else {
        //console.log('Could not get wrapper'+ form)
    }

    if (visibility === "hide") {
        // Show summary, hide form
        if (wrapper) {
            wrapper.classList.add("hide");
        }
    } else if (visibility === "show") {
        // Hide summary, show form
        if (wrapper) {
            wrapper.classList.add("show-now");
        }
    } else {
        console.error("Invalid action specified");
    }
};

console.log("functions loaded from GITHUB")