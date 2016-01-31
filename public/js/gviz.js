google.load('visualization', '1', {packages: ['corechart']});
google.setOnLoadCallback(drawChart);
var gviz_handles = [];

function readyHandler() {
    $(".place_holder").each(function() {
        if ($(this).html().length > 0) { $(this).removeClass("place_holder"); }
    });
}

function drawGIT(data) {
    var html = "", lb_private = "", name = data.nick_name;
    if (data.private) {
        lb_private = '<span class="label label-success">private</span>';
    } else {
        lb_private = '<span class="label label-magenta">public</span>';
    }
    $("#git-name-" + name).html('<span class="lead"><mark><b><u>' + data.id + '</u></b></mark></span>&nbsp;&nbsp;' + lb_private);
    $("#git-url-" + name).html('<a href="' + data.url + '" target="_blank"><code>' + data.url + '</code> <i class="fa fa-fw fa-sm fa-external-link"></i></a>');
    $("#git-label-" + name).html('<span class="label label-green">created</span>&nbsp;<span class="label label-primary">' + data.created_at + '</span>&nbsp;&nbsp;<span class="label label-dark-green">last pushed</span>&nbsp;<span class="label label-primary">' + data.pushed_at + '</span></p><p><span class="label label-danger">issue</span>&nbsp;' + data.num_issues + '&nbsp;&nbsp;<span class="label label-info">download</span>&nbsp;' + data.num_downloads + '&nbsp;&nbsp;<span class="label label-info">pull</span>&nbsp;' + data.num_pulls + '&nbsp;&nbsp;<span class="label label-orange">branch</span>&nbsp;' + data.num_branches + '&nbsp;&nbsp;<span class="label label-orange">fork</span>&nbsp;' + data.num_forks + '&nbsp;&nbsp;<span class="label label-violet">watcher</span>&nbsp;' + data.num_watchers);

    for (var j = 0; j < data.data.length; j++) {
        html += '<tr><td>' + data.data[j].Contributors + '</td><td><span class="pull-right" style="color:#00f;">' + data.data[j].Commits + '&nbsp;&nbsp;&nbsp;&nbsp;</span></td><td><span class="pull-right" style="color:#080;">' + data.data[j].Additions + '&nbsp;&nbsp;&nbsp;&nbsp;</span></td><td><span class="pull-right" style="color:#f00;">' + data.data[j].Deletions + '&nbsp;&nbsp;&nbsp;&nbsp;</span></td></tr>';
    }
    html += '<tr><td colspan="4" style="padding: 0px;"></td></tr>';
    $("#git-tb-" + name).html(html);


    var chart = new google.visualization.ChartWrapper({
        'chartType': 'AreaChart',
        'dataSourceUrl': '/git/?type=c&repo=' + name,
        'containerId': 'plot_c_' + name,
        'options': {
            'chartArea': {'width': '90%', 'left': '10%'},
            'legend': {'position': 'none'},
            'title': 'Commit Activity',
            'titleTextStyle': {'bold': false, 'fontSize': 16},
            'vAxis': {
                'title': 'Count (#)',
                'titleTextStyle': {'bold': true},
            },
            'hAxis': {
                'gridlines': {'count': -1},
                'textStyle': {'italic': true},
                'format': 'MMM dd'
            },
            'lineWidth': 2,
            'pointSize': 3,
            'colors': ['#3ed4e7'],
            'animation': {'startup': true, 'duration': 1000, 'easing': 'inAndOut'}
        }
    });
    google.visualization.events.addListener(chart, 'ready', readyHandler);
    chart.draw();
    gviz_handles.push(chart);

    chart = new google.visualization.ChartWrapper({
        'chartType': 'AreaChart',
        'dataSourceUrl': '/git/?type=a&repo=' + name,
        'containerId': 'plot_ad_' + name,
        'options': {
            'chartArea': {'width': '90%', 'left': '10%'},
            'legend': {'position': 'bottom'},
            'title': 'Code Frequency',
            'titleTextStyle': {'bold': false, 'fontSize': 16},
            'vAxis': {
                'title': 'Count (#)',
                'titleTextStyle': {'bold': true},
            },
            'hAxis': {
                'gridlines': {'count': -1},
                'textStyle': {'italic': true},
                'format': 'MMM dd'
            },
            'lineWidth': 2,
            'pointSize': 3,
            'colors': ['#29be92', '#ff5c2b'],
            'animation': {'startup': true, 'duration': 1000, 'easing': 'inAndOut'}
        }
    });
    google.visualization.events.addListener(chart, 'ready', readyHandler);
    chart.draw();
    gviz_handles.push(chart);
}


function drawChart() {
    var html = "", i = 0, name = "";
    for (i = 0; i < repo.length; i++) {
        name = repo[i];
        html += '<div class="row"><div class="col-lg-6 col-md-6 col-sm-12 col-xs-12"><p id="git-name-' + name + '"></p><p id="git-url-' + name + '"></p><p id="git-label-' + name + '"></p><br/><table class="table table-hover"><thead><tr class="active"><th class="col-lg-3 col-md-3 col-sm-3 col-xs-3"><i class="fa fa-fw fa-user"></i>&nbsp;&nbsp;Account</th><th class="col-lg-3 col-md-3 col-sm-3 col-xs-3"><i class="fa fa-fw fa-chevron-circle-up"></i>&nbsp;&nbsp;Commits</th><th class="col-lg-3 col-md-3 col-sm-3 col-xs-3"><i class="fa fa-fw fa-plus-circle"></i>&nbsp;&nbsp;Additions</th><th class="col-lg-3 col-md-3 col-sm-3 col-xs-3"><i class="fa fa-fw fa-minus-circle"></i>&nbsp;&nbsp;Deletions</th></tr></thead><tbody id="git-tb-' + name + '"></tbody></table></div><div class="col-lg-6 col-md-6 col-sm-12 col-xs-12"><div id="plot_c_' + name + '" class="thumbnail git place_holder" style="height: 175px;"></div><div id="plot_ad_' + name + '" class="thumbnail git place_holder" style="height: 175px;"></div></div></div>';
        if (i < repo.length - 1) { html += '<hr/>'; }
    }
    $("#git_body").html(html).removeClass("place_holder");

    for (i = 0; i < repo.length; i++) {
        name = repo[i];
        $.ajax({
            url : "/git/?type=n&repo=" + name,
            dataType: "json",
            success: drawGIT
        });
    }
}

