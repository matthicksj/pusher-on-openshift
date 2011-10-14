Rails Pusher, OpenShift and JavaScript
=========================

This quickstart provides a simple rails application that
feeds actual cgroup memory usage data from your application
over a websocket (using pusher.com) to a JavaScript widget
on the client side that updates real-time.

Credits
--------------------
PusherApp - http://pusherapp.com

SVG Plugin - http://keith-wood.name

JQuery - http://jquery.com

Rails - http://rubyonrails.org

Running on OpenShift
--------------------

Create an account at http://openshift.redhat.com/

Create a rails application

    rhc-create-app -a websockets -t rack-1.1

Add this upstream example repo

    cd websockets
    git remote add upstream -m master git://github.com/matthicksj/pusher-on-openshift.git
    git pull -s recursive -X theirs upstream master

Create an account on http://pusher.com

Update the Pusher API information in config/initializers/pusher.rb

Then push the repo upstream

    git push

That's it, you can now checkout your application at:

    http://websockets-$yourdomain.rhcloud.com
