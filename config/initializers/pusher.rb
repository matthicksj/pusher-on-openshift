require 'pusher'

#######################################################
######### ADD YOUR PUSHER INFO HERE ###################
#######################################################
Pusher.app_id = 'YOUR_APP_ID'
Pusher.key = 'YOUR_KEY'
Pusher.secret = 'YOUR_SECRET'

########################################################
# Yeah, this only polls data but I'm sure you can think
# of some cool data to monitor for your use case.  Anyway
# this just reads the cgroup information in a thread
# and then sends that data to pusher every 0.5 seconds
#######################################################
Thread.new do
  while true do
    if File.exists?("pusher.lock")
#      mem_limit = `rhc-cgroup-read memory.limit_in_bytes`.to_i
#      mem_usage = `rhc-cgroup-read memory.usage_in_bytes`.to_i
       mem_limit = $mem_limit || 300*1024*1024
       mem_usage = $mem_usage || 50*1024*1024
      response = ActiveSupport::JSON.encode({"limit" => mem_limit, "usage" => mem_usage})
      Pusher['test_channel'].trigger('my_event', response)
    end

    sleep 0.5
  end
end

# Initially create the file
FileUtils.touch "pusher.lock"

Rails.logger.info "Pusher data stream is running"
