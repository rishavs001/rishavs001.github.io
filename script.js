//emailJS
function SendMail(e) {
    e.preventDefault();
    // alert('Sending your message');
    let params = {
      from_name : document.getElementById("fullName").value,
      email_id : document.getElementById("emailId").value,
      mobile_number : document.getElementById("mobileNumber").value,
      subject : document.getElementById("emailSubject").value,
      message : document.getElementById("message").value
    }
    emailjs.send("service_9cclw2w","template_l0ueb2k",params)
    .then((res) => {
      // console.log('Email sent successfully:', response);
      alert('Email sent successfully!');
    //   Clear the form after successful submission
      e.target.reset();
    }, (error) => {
      // console.error('Error sending email:', error);
      alert('An error occurred while sending the email.'+ error);
    });
  }