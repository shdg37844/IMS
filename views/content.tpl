{% extends './layout.tpl' %}

{% block css %}
<link rel="stylesheet" href="/stylesheets/navBar.css">
{% endblock %}

{% block content %}
<div class="page-body">
    <div class="header-nav-box">
        <div class="nav-bar-list">
            <a href="/homepage" class="nav-item">全部</a>
            {% for item in classify %}
            <a href="/articles?category={{item.name}}" class="nav-item">{{item.name}}</a>
            {% endfor %}    
        </div>
    </div>
    <div class="mainer">
        <div class="content">
            <div class="article-detail">
                <h1 class="article-title">{{content.title}}</h1>
                <div class="article-time">{{content.created_at | formatDate}}</div>
                <div class="article-text">{{content.content}}</div>
            </div>
        </div>
    </div>
<div>
{% endblock %}

{% block js %}
<script src="/javascripts"></script>
{% endblock %}
