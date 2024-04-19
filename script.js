function SendMail(e) {
  e.preventDefault();
  var toast = document.getElementById('toast');
  var loadingBar = document.getElementById('loading-bar');
  var loadingProgress = document.getElementById('loading-progress');

  // Show loading bar
  loadingBar.classList.remove('hidden');
  loadingProgress.style.width = '0%';

  // Show loading toast
  toast.classList.remove('hidden', 'success', 'failure');
  toast.innerText = 'Sending message...';
  toast.style.display = 'block';

  // Simulate loading delay (you can replace this with your actual loading code)
  setTimeout(function() {
    var isSuccess = Math.random() < 0.5; // Simulating success/failure
    

    // Hide the toast and loading bar after a short delay
    setTimeout(function() {
      toast.style.display = 'none';
      loadingBar.classList.add('hidden');
    }, 2000); // 2000 milliseconds = 2 seconds for the toast to disappear
  }, 2000); // 2000 milliseconds = 2 seconds loading time
  let params = {
      from_name: document.getElementById("fullName").value,
      email_id: document.getElementById("emailId").value,
      mobile_number: document.getElementById("mobileNumber").value,
      subject: document.getElementById("emailSubject").value,
      message: document.getElementById("message").value
  };

  emailjs.send("service_9cclw2w", "template_l0ueb2k", params)
      .then((res) => {
        toast.innerText = 'Success!';
      toast.classList.add('success');
        //   alert('Email sent successfully!');
          // Clear the form after successful submission
          document.getElementById("myForm").reset();
      })
      .catch((error) => {
        toast.innerText = 'Failure!';
      toast.classList.add('failure');
        //   alert('An error occurred while sending the email: ' + error);
      });
}
