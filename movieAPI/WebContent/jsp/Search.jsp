<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Find your movies!</title>
<script src="../js/lib/angular.min.js"></script>
<script src="../js/custom/functions.js"></script>
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<script src="../js/lib/bootstrap-3.3.7/js/bootstrap.min.js"></script>
<script src="../js/lib/jquery.bootpag.min.js"></script>
<link rel="stylesheet"
	href="../js/lib/bootstrap-3.3.7/css/bootstrap.min.css">
<link rel="stylesheet" href="../css/custom/style.css">

</head>
<body style="background-color:#00004d;font-color:white;" ng-app="movieSearch" ng-controller="searchController">
	<header></header>
	<section>
		<div class="container">
			<div class="row">
				<div class="form-group has-feedback">
					<input type="text" ng-model="searchVal" class="form-control"
						placeholder="Enter the movie name..." ng-keyup="sendReq($event)" />
					<i class="glyphicon glyphicon-search form-control-feedback"></i>
				</div>
			</div>
			<div class="row">
				<div class="panel panel-default"
					ng-if="phase=='search'&&results!='none'">
					<search> </search>
				</div>

				<div class="panel panel-default"
					ng-if="phase=='details'" style="overflow-y:auto">
					<a href="#" ng-click="showSearch()">Back</a>
					<detailinfo> </detailinfo>
				</div>				<div ng-if="results=='none'"
					class="alert alert-danger alert-dismissable"
					style="text-align: center;">No results found!</div>

			</div>
			<div class="row" style="text-align: center"
				ng-show="phase=='search'&&results!='none'">
				<div class="paginate"></div>
			</div>
		</div>
	</section>
	<footer></footer>
</body>
</html>