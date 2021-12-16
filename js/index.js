$(document).ready(function() {

  // ONE PAGE SCROLL NAVIGATION W/ HIGHLIGHTED NAV LINKS

        let $sections = $('.s-anchor');

        $(window).scroll(function(){

        let navBarHeightOffset = 62;

        let currentScroll = $(this).scrollTop() + navBarHeightOffset;

        let $currentSection;

        $sections.each(function(){

                let divPosition = $(this).offset().top;

                if( divPosition - 1 < currentScroll ){
                        $currentSection = $(this);
                }

                let id = $currentSection.attr('id');
                $('a').removeClass('active');
                $("[href=\"#"+id+"\"]").addClass('active');

                })
        });

        // JQUERY FORM VALIDATION

        let form = $("form[name='contact']");

        form.validate({
                rules: {
                  firstName: {
                        required: true,
                        minlength: 3
                  },
                  email: {
                    required: true,
                    email: true
                  },
                  message: {
                    required: true,
                    minlength: 10
                  }
                },
                messages: {
                  firstName: {
                        required: "Please enter your first name",
                        minlength: "Your name must be atleast 3 characters long"
                  },
                  message: {
                    required: "Please enter your message",
                    minlength: "Your message must be at least 10 characters long"
                  },
                  email: "Please enter a valid email address"
                },
                errorElement: 'div',
                errorLabelContainer: '.errorText',
                invalidHandler: function(e) {
                        e.preventDefault()
                },
                submitHandler: function(form, e) {

                let submitButton = $("button[type='submit']");

                $(submitButton).html("<span class='spinner-border spinner-border-sm mr-2' role='status' aria-hidden='true'></span>Loading...");
                const result = postData("./email.php", $(form).serialize())
                        .then(function(response) 
                                {  
                                        $(submitButton).removeClass("btn-primary");
                                        $(submitButton).removeClass("bg-steel-blue");
                                if (response.ok) {
                                        $(submitButton).html("<i class='far fa-check-circle mr-2'></i>Success!")
                                        $(submitButton).addClass("btn-success");
                                } else {
                                        $(submitButton).html("<i class='far fa-times-circle mr-2'></i>Error! Try again later.")
                                        $(submitButton.addClass("btn-danger"));
                                }
                        })


                        clearForms();

                }
        });

});


async function postData(url = '', dataString)
{
        return response = await fetch(url, {
                                method: 'POST',
                                mode: 'cors',
                                cache: 'no-cache',
                                credentials: 'same-origin',
                                body: dataString        
        });
}


function toggleNav() {

        let mobileNav = document.getElementById("mobileNav");
        let button = document.querySelector(".navbar-toggler");

        mobileNav.classList.toggle("show");
        button.classList.toggle("active");

}

function clearForms()
{
    $(':input').not(':button, :submit, :reset, :hidden, :checkbox, :radio').val('');
    $(':checkbox, :radio').prop('checked', false);
}


