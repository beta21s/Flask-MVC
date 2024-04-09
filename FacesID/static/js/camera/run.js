var options = {
    accessKeyId: 'AKIA33ODSCGMI2LWA43F',
    secretAccessKey: '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',
    region: 'ap-southeast-1',
}

var kinesisVideo = new AWS.KinesisVideo(options);
var kinesisVideoArchivedContent = new AWS.KinesisVideoArchivedMedia(options);

function streamVideos(control, streamName) {
    kinesisVideo.getDataEndpoint({StreamName: streamName, APIName: "GET_DASH_STREAMING_SESSION_URL"},
        function (err, response) {
            if (err) {
                return console.error(err);
            }

            console.log('Data endpoint: ' + response.DataEndpoint);
            kinesisVideoArchivedContent.endpoint = new AWS.Endpoint(response.DataEndpoint);

            kinesisVideoArchivedContent.getHLSStreamingSessionURL({
                StreamName: streamName,
                PlaybackMode: "LIVE",
                ContainerFormat: "FRAGMENTED_MP4",
                DiscontinuityMode: "ALWAYS"
            }, function (err, response) {
                if (err) {
                    return console.error(err);
                }
                console.log('HLS Streaming Session URL: ' + response.HLSStreamingSessionURL);
                var player = videojs(control);
                console.log('Created VideoJS Player');
                player.src({src: response.HLSStreamingSessionURL, type: 'application/x-mpegURL'});
                console.log('Set player source');
                player.play();
                console.log('Starting playback');
            });
        });
}